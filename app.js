document.getElementById("rppForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // mencegah reload

  const status = document.getElementById("status");
  status.innerText = "⏳ Sedang memproses…";

  const data = {};

  // Ambil semua input & textarea
  document.querySelectorAll("input, textarea").forEach(el => {
    data[el.id] = el.value;
  });

  // Kirim ke SERVER (seperti AI Studio)
  const response = await fetch("/.netlify/functions/generate-rpp", {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    status.innerText = "❌ Gagal membuat PDF";
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  window.open(url);
  status.innerText = "✅ PDF berhasil dibuat";
});
