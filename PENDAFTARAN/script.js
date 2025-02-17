        function isArabic(text) {
          const arabicRegex = /[\u0600-\u06FF]/;
          return arabicRegex.test(text);
        }
      
        function processText(text) {
          let processedText = text.replace(/\*(.*?)\*/g, '<span class="underline-text">$1</span>');
          processedText = processedText.replace(/\#(.*?)\#/g, '<span class="center-text">$1</span>');
          processedText = processedText.replace(/\^(.*?)\^/g, '<span class="quote-text">$1</span>');
          processedText = processedText.replace(/\$(.*?)\$/g, '<span class="bold">$1</span>');
      
          return processedText;
        }
      
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
          const SPREADSHEET_ID1 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE1 = 'KOMENTAR';
          getData(SPREADSHEET_ID1, RANGE1, 'dataTable1');
      
          const SPREADSHEET_ID2 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE2 = 'PEMBAYARAN_MADIN';
          getData(SPREADSHEET_ID2, RANGE2, 'dataTable2');
      
          const SPREADSHEET_ID3 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE3 = 'PEMBAYARAN_TPQ';
          getData(SPREADSHEET_ID3, RANGE3, 'dataTable3');
      
          const SPREADSHEET_ID4 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE4 = 'KURIKULUM_PP';
          getData(SPREADSHEET_ID4, RANGE4, 'dataTable4');
      
          const SPREADSHEET_ID5 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE5 = 'KURIKULUM_MADIN';
          getData(SPREADSHEET_ID5, RANGE5, 'dataTable5');
      
          const SPREADSHEET_ID6 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE6 = 'KURIKULUM_TPQ';
          getData(SPREADSHEET_ID6, RANGE6, 'dataTable6');
      
          const SPREADSHEET_ID7 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE7 = 'PERTAHUN_PA';
          getData(SPREADSHEET_ID7, RANGE7, 'dataTable7');
      
          const SPREADSHEET_ID8 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE8 = 'PSSB';
          getData(SPREADSHEET_ID8, RANGE8, 'dataTable8');
      
          const SPREADSHEET_ID9 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE9 = 'DAFTAR_ULANG';
          getData(SPREADSHEET_ID9, RANGE9, 'dataTable9');
      
          const SPREADSHEET_ID10 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE10 = 'MAKAN';
          getData(SPREADSHEET_ID10, RANGE10, 'dataTable10');
      
          const SPREADSHEET_ID11 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE11 = 'DAFTAR_ULANGPI';
          getData(SPREADSHEET_ID11, RANGE11, 'dataTable11');
      
          const SPREADSHEET_ID12 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE12 = 'PSBPI';
          getData(SPREADSHEET_ID12, RANGE12, 'dataTable12');
      
          const SPREADSHEET_ID13 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE13 = 'KEGIATAN';
          getData(SPREADSHEET_ID13, RANGE13, 'dataTable13');

          const SPREADSHEET_ID14 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE14 = 'HARIAN_MTSPA';
          getData(SPREADSHEET_ID14, RANGE14, 'dataTable14');

          const SPREADSHEET_ID15 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE15 = 'HARIAN_SLFPA';
          getData(SPREADSHEET_ID15, RANGE15, 'dataTable15');

          const SPREADSHEET_ID16 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE16 = 'MINGGUAN_PA';
          getData(SPREADSHEET_ID16, RANGE16, 'dataTable16');

          const SPREADSHEET_ID17 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE17 = 'HARIAN_MTSPI';
          getData(SPREADSHEET_ID17, RANGE17, 'dataTable17');

          const SPREADSHEET_ID18 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE18 = 'HARIAN_SLFPI';
          getData(SPREADSHEET_ID18, RANGE18, 'dataTable18');

          const SPREADSHEET_ID19 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE19 = 'TAHFIDZ';
          getData(SPREADSHEET_ID19, RANGE19, 'dataTable19');

          const SPREADSHEET_ID20 = '1lgnUGg3e-Xav7e26XauDyQ9V5-se09dqvFu4IuQ6xTY';
          const RANGE20 = 'MINGGUAN_PI';
          getData(SPREADSHEET_ID20, RANGE20, 'dataTable20');

          const SPREADSHEET_ID21 = '1Xc26ggKR2amOU-2tAilSO7Ma7bTfA5XyocMUtFhsR38';
          const RANGE21 = 'SYARAT_PENDAFTARAN';
          getData(SPREADSHEET_ID21, RANGE21, 'dataTable21');
      });  
      

      const pengeluaranForm = document.forms['chattdata2'];
      const namaLengkap = document.getElementById('nama_lengkap');
      const nik = document.getElementById('nik');
      const tempatTanggalLahir = document.getElementById('tempat_tanggal_lahir');
      const namaAyah = document.getElementById('nama_ayah');
      const namaIbu = document.getElementById('nama_ibu');
      const dusunJalan = document.getElementById('dusun_jalan');
      const rt = document.getElementById('rt');
      const rw = document.getElementById('rw');
      const desaKelurahan = document.getElementById('desa_kelurahan');
      const kecamatan = document.getElementById('kecamatan');
      const kabupatenKota = document.getElementById('kabupaten_kota');
      const provinsi = document.getElementById('provinsi');
  
      const pengeluaranScriptURL = 'https://script.google.com/macros/s/AKfycbwohUVAWNe8lJ4xWQycwz9jER0M8IkcWU_Df5vq72gnNzJTn3BwYBmw6RKp52U2M5kJ/exec';
      
        // Reset form
        pengeluaranForm.reset();
      
      pengeluaranForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const isArabic = /[\u0600-\u06FF]/.test(messageInput1.value);
      
        if (isArabic) {
          messageInput1.style.direction = 'rtl';
        } else {
          messageInput1.style.direction = 'ltr';
        }
      
        const formData = new FormData(pengeluaranForm);
      
        formData.forEach((value, key, fd) => {
          fd.set(key, value.replace(/<br>/g, '\n'));
        });
      
        fetch(pengeluaranScriptURL, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            console.log('chatt Success!', data);
            pengeluaranForm.reset();
          })
          .catch(error => console.error('chatt Error!', error.message));
      
        // Setelah submit, sembunyikan pop-up
        popupFormContainer.style.display = 'none';
        // Reset form
        pengeluaranForm.reset();
      });
      fetch(pengeluaranScriptURL, {
      method: 'POST',
      body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('chatt Success!', data);
        pengeluaranForm.reset();
      })
      .catch(error => console.error('chatt Error!', error.message));