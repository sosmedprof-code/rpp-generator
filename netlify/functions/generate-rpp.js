const PDFDocument = require("pdfkit");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {});

    doc.fontSize(16).text("RPP PEMBELAJARAN", { align: "center" });
    doc.moveDown(1.5);

    doc.fontSize(11).text(`Sekolah: ${data.sekolah || "-"}`);
    doc.text(`Mata Pelajaran: ${data.mapel || "-"}`);
    doc.text(`Kelas/Semester: ${data.kelas || "-"}`);
    doc.moveDown();

    const sections = [
      ["Kompetensi Dasar", data.kompetensi],
      ["Indikator", data.indikator],
      ["Tujuan Pembelajaran", data.tujuan],
      ["Materi", data.materi],
      ["Metode", data.metode],
      ["Langkah Pembelajaran", data.kegiatan],
      ["Penilaian", data.penilaian],
      ["Sumber Belajar", data.sumber],
    ];

    sections.forEach(([title, content]) => {
      doc.fontSize(12).text(title, { underline: true });
      doc.moveDown(0.3);
      doc.fontSize(10).text(content || "-", { align: "justify" });
      doc.moveDown();
    });

    doc.end();

    const pdfBuffer = Buffer.concat(buffers);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=RPP.pdf"
      },
      body: pdfBuffer.toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
