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
    // Get the current date
    let currentDate = new Date();

    // Get the year, month, and day
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Pad single-digit months with a leading zero
    let day = currentDate.getDate().toString().padStart(2, '0'); // Pad single-digit days with a leading zero

    // Create the formatted date string
    let formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);
    
    function dateToTime(date) {
      const d = new Date(date)
      let hour = d.getHours().toString().padStart(2, '0'); // Pad single-digit months with a leading zero
      let minute = d.getMinutes().toString().padStart(2, '0'); // Pad single-digit months with a leading zero
      return `${hour}:${minute}`
    }
    ed.timetable.fetchByDay(formattedDate).then((scheduleData) => {
      function generateHTML(scheduleData) {
        // Convert scheduleData object to an array for sorting
        const sortedData = Object.values(scheduleData).sort((a, b) => {
          return new Date(a.start_date) - new Date(b.start_date);
        });
      
        let html = `
          <html>
            <head>
              <style>
                /* CSS */
                table {
                  border-collapse: collapse;
                  width: 100%;
                  white-space: nowrap;
                }
                th, td {
                  border: 0px;
                  text-align: left;
                  padding: 8px;
                }
                td:first-child {
                  width: 1%;
                  white-space: nowrap;
                }
                tr:nth-child(even) {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <table>
                <tr>
                  <th></th>
                  <th></th>

                </tr>
        `;
      
        for (const entry of sortedData) {
          let start_date = dateToTime(entry.start_date)
          let end_date = dateToTime(entry.end_date)
          html += `
            <tr style="background-color:${entry.color};">
              <td>${start_date} <br> ${end_date}
              <td>${entry.text} <br> ${entry.prof} <br> ${entry.salle}
          `;        }
      
        html += `
              </table>
            </body>
          </html>
        `;
      
        return html;
      }
      
      // Save the generated HTML to a file (works in a browser environment)
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
