document.getElementById("rppForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const status = document.getElementById("status");
  status.innerText = "⏳ Sedang membuat PDF...";

  // Ambil semua input & textarea
  const data = {};
  document.querySelectorAll("#rppForm input, #rppForm textarea").forEach(el => {
    data[el.id] = el.value;
  });

  try {
    const response = await fetch("/.netlify/functions/generate-rpp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      status.innerText = "❌ Server error saat membuat PDF";
      return;
    }

    // Ambil response sebagai BLOB (WAJIB untuk PDF)
    const blob = await response.blob();

    // Paksa download file
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "RPP.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);

    status.innerText = "✅ PDF berhasil dibuat & diunduh";

  } catch (error) {
    status.innerText = "❌ Gagal terhubung ke server";
  }
});
