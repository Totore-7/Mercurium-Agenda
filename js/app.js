import ED from "https://esm.sh/papillon-ed-core";


let ed = new ED();

ed.auth
  .login("axelxel", "@legoev3AX")
  .then(() => {
    let token = ed._token;
    let id = ed.student.idw;
    console.log(id);
    let prenom = ed.student.prenom;
    console.log(prenom);
    ed.timetable.fetchByDay("2024-01-18").then((scheduleData) => {
      // Function to generate HTML from schedule data
      function generateHTML(scheduleData) {
        let html = `
          <html>
            <head>
              <style>
                /*CSS*/
                table {
                  border-collapse: collapse;
                  width: 100%;
                }
                th, td {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                tr {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <table>
                <tr>
                  <th></th>

                </tr>
        `;

        for (const key in scheduleData) {
          const entry = scheduleData[key];
          html += `
            <tr style="background-color:${entry.color};">
              <td>${entry.text} - ${entry.prof} - ${entry.salle}</td>
            </tr>
          `;
        }

        html += `
              </table>
            </body>
          </html>
        `;

        return html;
      }

      // Save the generated HTML to a file
      const htmlContent = generateHTML(scheduleData);
      document.open();
      document.write(htmlContent);
      document.close();


      console.log('Schedule HTML generated successfully.');
    });
  })
  .catch((err) => {
    // In case of error during login
    console.log(err);
  });
