import "dotenv/config"
import { createWebhookObjectClient, secretFromEnv } from "@gathertown/webhook-object-sdk"

const lamp = createWebhookObjectClient({
  url: "https://api.v2.gather.town/api/v2/hooks/spaces/9ed2542d-ef79-46ab-abae-8dc91849b3f8/objects/297de576-5f00-4349-b7ea-4b8d2ecaa7df",
  secret: secretFromEnv("GATHER_WEBHOOK_SECRET"),
  preset: "switch",
})

// Intervalo entre trocas de estado. 2s = 30 eventos/min, bem abaixo do
// limite de 60 req/min por space (e dá pra ver o piscar tranquilamente).
const BLINK_INTERVAL_MS = 2000

let on = false
let running = true

async function verifySetup() {
  try {
    const res = await lamp.ping()
    console.log("✅ ping ok — preset:", res.preset, "| capabilities:", res.capabilities)
  } catch (err) {
    console.error("❌ Falha no ping. Confira o GATHER_WEBHOOK_SECRET e a URL.")
    throw err
  }
}

async function blinkLoop() {
  while (running) {
    on = !on
    try {
      await lamp.switch.setState({ on })
      console.log(`💡 lâmpada -> ${on ? "ON" : "OFF"}`)
    } catch (err) {
      console.error("Erro ao enviar switch.set_state:", err.code ?? err.message)
    }
    await sleep(BLINK_INTERVAL_MS)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

process.on("SIGINT", async () => {
  console.log("\nEncerrando... apagando a lâmpada antes de sair.")
  running = false
  try {
    await lamp.switch.setState({ on: false })
  } catch {
  }
  process.exit(0)
})

await verifySetup()
console.log(`Piscando a cada ${BLINK_INTERVAL_MS}ms. Ctrl+C para parar.`)
await blinkLoop()
