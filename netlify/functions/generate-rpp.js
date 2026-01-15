const PDFDocument = require("pdfkit");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const doc = new PDFDocument({ margin: 40 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {});

    doc.fontSize(14).text("RPP PEMBELAJARAN", { align: "center" });
    doc.moveDown();

    doc.fontSize(10).text(`Sekolah: ${data.sekolah || "-"}`);
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
      doc.fontSize(11).text(title, { underline: true });
      doc.fontSize(10).text(content || "-");
      doc.moveDown();
    });

    doc.end();

    const pdfBuffer = Buffer.concat(buffers);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=RPP.pdf",
      },
      body: pdfBuffer.toString("base64"),
      isBase64Encoded: true,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
};
