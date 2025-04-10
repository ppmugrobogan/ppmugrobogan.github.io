
// PEMANGGIL DATA
function isArabic(text) {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }

  function processText(text) {
      let processedText = text.replace(/\*(.*?)\*/g, function(match, p1) {
          return `<span class="underline-text">${p1}</span>`;
      });
  
      processedText = processedText.replace(/\#(.*?)\#/g, '<span class="center-text">$1</span>');
      processedText = processedText.replace(/\^(.*?)\^/g, '<span class="quote-text">$1</span>');
      processedText = processedText.replace(/\$(.*?)\$/g, '<span class="bold">$1</span>');
  
      return processedText;
  }
  
  // Fungsi untuk memastikan class `underline-text` bekerja di dalam tabel
  document.addEventListener("DOMContentLoaded", function() {
      document.querySelectorAll("td .underline-text").forEach(span => {
          let td = span.closest("td");
          if (td) {
              td.classList.add("underline-text"); // Menambahkan class ke <td>
          }
      });
  });
  

  function toggleRowVisibility(event) {
    const button = event.target;
    const row = button.closest('tr');
    const contentRow = row.nextElementSibling;

    if (contentRow && contentRow.classList.contains('expanded-row')) {
      contentRow.remove(); // Remove the expanded row
    } else {
      const newRow = row.parentNode.insertRow(row.rowIndex + 1);
      newRow.classList.add('expanded-row');

      const newCell = newRow.insertCell(0);
      newCell.colSpan = row.cells.length;

      const contentDiv = document.createElement('div');
      newRow.appendChild(newCell);
      newCell.appendChild(contentDiv);

      row.querySelectorAll('td').forEach((cell, index) => {
        if (index !== 0) {
          const cellContent = cell.cloneNode(true);
          cellContent.style.display = 'block';
          contentDiv.appendChild(cellContent);
        }
      });
    }
  }

  function processDataAndPopulateTable(data, tableId) {
    const values = data.values;
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';

    values.forEach(row => {
      const newRow = tableBody.insertRow();
      row.forEach(cellValue => {
        const newCell = newRow.insertCell();
        const isArabicText = isArabic(cellValue);

        if (isArabicText) {
          newCell.classList.add('rtl');
        } else {
          newCell.classList.add('indonesia');
        }

        // Replace new line characters (\n) with <br> tags
        const newText = document.createElement('div');
        newText.innerHTML = processText(cellValue).replace(/\n/g, '<br>');
        newCell.appendChild(newText);
      });
    });
  }

  function getData(spreadsheetId, range, tableId) {
    const API_KEY = 'AIzaSyA8x0yI8zCPUgZktmGNvQVTzhm1fdZ0K74';
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => processDataAndPopulateTable(data, tableId))
      .catch(error => console.error('Error fetching data:', error));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const SPREADSHEET_ID1 = '1XYlgTfNDAKD6XtyIFxWUk0ET2aR9Ll0sIrhg-n2nbNM';
    const RANGE1 = 'KEGIATAN_HARIAN_SANTRI_SALAF';
    getData(SPREADSHEET_ID1, RANGE1, 'dataTable1');

    const SPREADSHEET_ID2 = '1XYlgTfNDAKD6XtyIFxWUk0ET2aR9Ll0sIrhg-n2nbNM';
    const RANGE2 = 'KEGIATAN_HARIAN_SANTRI_MTS';
    getData(SPREADSHEET_ID2, RANGE2, 'dataTable2');

    const SPREADSHEET_ID3 = '1XYlgTfNDAKD6XtyIFxWUk0ET2aR9Ll0sIrhg-n2nbNM';
    const RANGE3 = 'KEGIATAN_HARIAN_SANTRI_TAHFIDZ';
    getData(SPREADSHEET_ID3, RANGE3, 'dataTable3');

    const SPREADSHEET_ID4 = '1XYlgTfNDAKD6XtyIFxWUk0ET2aR9Ll0sIrhg-n2nbNM';
    const RANGE4 = 'KEGIATAN_MINGGUAN';
    getData(SPREADSHEET_ID4, RANGE4, 'dataTable4');

    const SPREADSHEET_ID5 = '1XYlgTfNDAKD6XtyIFxWUk0ET2aR9Ll0sIrhg-n2nbNM';
    const RANGE5 = 'KEGIATAN_TAHUNAN';
    getData(SPREADSHEET_ID5, RANGE5, 'dataTable5');

    // const SPREADSHEET_ID6 = '12PYVK0MoznU6BPXv8Ibx83tx6-eXVM7jOWkdMvQx43A';
    // const RANGE6 = 'ADMINISTRASI_TAHUNAN_MADRASAH';
    // getData(SPREADSHEET_ID6, RANGE6, 'dataTable6');

    // const SPREADSHEET_ID7 = '12PYVK0MoznU6BPXv8Ibx83tx6-eXVM7jOWkdMvQx43A';
    // const RANGE7 = 'BIAYA_MAKAN_PUTRA';
    // getData(SPREADSHEET_ID7, RANGE7, 'dataTable7');

    // const SPREADSHEET_ID8 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE8 = 'PERTAHUN_PA';
    // getData(SPREADSHEET_ID8, RANGE8, 'dataTable8');

    // const SPREADSHEET_ID9 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE9 = 'DAFTAR_ULANG';
    // getData(SPREADSHEET_ID9, RANGE9, 'dataTable9');

    // const SPREADSHEET_ID10 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE10 = 'MAKAN';
    // getData(SPREADSHEET_ID10, RANGE10, 'dataTable10');

    // const SPREADSHEET_ID11 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE11 = 'DAFTAR_ULANGPI';
    // getData(SPREADSHEET_ID11, RANGE11, 'dataTable11');

    // const SPREADSHEET_ID12 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE12 = 'PSBPI';
    // getData(SPREADSHEET_ID12, RANGE12, 'dataTable12');

    // const SPREADSHEET_ID13 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE13 = 'KEGIATAN';
    // getData(SPREADSHEET_ID13, RANGE13, 'dataTable13');

    // const SPREADSHEET_ID14 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE14 = 'HARIAN_MTSPA';
    // getData(SPREADSHEET_ID14, RANGE14, 'dataTable14');

    // const SPREADSHEET_ID15 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE15 = 'HARIAN_SLFPA';
    // getData(SPREADSHEET_ID15, RANGE15, 'dataTable15');

    // const SPREADSHEET_ID16 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE16 = 'MINGGUAN_PA';
    // getData(SPREADSHEET_ID16, RANGE16, 'dataTable16');

    // const SPREADSHEET_ID17 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE17 = 'HARIAN_MTSPI';
    // getData(SPREADSHEET_ID17, RANGE17, 'dataTable17');

    // const SPREADSHEET_ID18 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE18 = 'HARIAN_SLFPI';
    // getData(SPREADSHEET_ID18, RANGE18, 'dataTable18');

    // const SPREADSHEET_ID19 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE19 = 'TAHFIDZ';
    // getData(SPREADSHEET_ID19, RANGE19, 'dataTable19');

    // const SPREADSHEET_ID20 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE20 = 'MINGGUAN_PI';
    // getData(SPREADSHEET_ID20, RANGE20, 'dataTable20');

    // const SPREADSHEET_ID21 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
    // const RANGE21 = 'SYARAT_PENDAFTARAN';
    // getData(SPREADSHEET_ID21, RANGE21, 'dataTable21');

    // const SPREADSHEET_ID22 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE22 = 'PERTAHUN_PAB';
    // getData(SPREADSHEET_ID22, RANGE22, 'dataTable22');

    // const SPREADSHEET_ID23 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE23 = 'DAFTAR_TAHFIDZ';
    // getData(SPREADSHEET_ID23, RANGE23, 'dataTable23');

    // const SPREADSHEET_ID24 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE24 = 'TAHUNAN_PILAMA';
    // getData(SPREADSHEET_ID24, RANGE24, 'dataTable24');

    // const SPREADSHEET_ID25 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE25 = 'TAHUNANPI_TAHFIDZ';
    // getData(SPREADSHEET_ID25, RANGE25, 'dataTable25');

    // const SPREADSHEET_ID26 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
    // const RANGE26 = 'PEMBAYARAN_MADINPI';
    // getData(SPREADSHEET_ID26, RANGE26, 'dataTable26');

    // const SPREADSHEET_ID27 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
    // const RANGE27 = 'MAKAN_PI';
    // getData(SPREADSHEET_ID27, RANGE27, 'dataTable27');
});  
