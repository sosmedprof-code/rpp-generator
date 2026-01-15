exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const rppText = `
RPP PEMBELAJARAN

Sekolah: ${data.sekolah}
Mata Pelajaran: ${data.mapel}
Kelas/Semester: ${data.kelas}

Kompetensi Dasar:
${data.kompetensi}

Indikator:
${data.indikator}

Tujuan Pembelajaran:
${data.tujuan}

Materi:
${data.materi}

Metode:
${data.metode}

Langkah Pembelajaran:
${data.kegiatan}

Penilaian:
${data.penilaian}

Sumber Belajar:
${data.sumber}
    `;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": "attachment; filename=rpp.txt"
      },
      body: rppText
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Error generating RPP"
    };
  }
};
