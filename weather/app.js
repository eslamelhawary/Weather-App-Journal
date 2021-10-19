// declaring my variables
let d = new Date();
let month = d.getMonth() + 1;
      let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();
      const api_key = 'ffbc382d6eef1dba7fb9f8da70ccd365';
      const generate_btn = document.querySelector('#generate');
      const date_output = document.getElementById('date');
      const temp_output = document.getElementById('temp');
      const content_output = document.getElementById('content');

   //setting generate button
   generate_btn.addEventListener('click', async () => {
   try {  let zip_code = document.getElementById('zip').value;

      let feeling_text = document.getElementById('feelings').value;

      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${api_key}&units=metric`;

      if (zip_code === "") { alert("Please enter a zip code to search it!") }
      
      else {

   // fetching data from the external API
      const data = await fetch(url);
         const dataObject = await data.json();
         
      //destructuring required data from the coming object
         const { main } = dataObject;
         const { temp } = main;
      

         //posting data to my local server
         await fetch('/recieveData', {
            method: 'POST',
            headers: {
               "COntent-Type": "application/json"
            },
            body:
               JSON.stringify({
                  date: newDate,
                  temp,
                  feelings :feeling_text
               })
         });



         // the final comming object from the server
         const finalresult = await getData();
         

         //Updating the UI
      date_output.innerHTML = finalresult.date;
      temp_output.innerHTML = finalresult.temp;
      content_output.innerHTML = finalresult.feelings;



         }
      }
   catch (e) {
      console.log('errror', e);
      }
   });


   //get data from the server
   async function getData(){
   const resdata = await fetch('/weather_object');
      const final = await resdata.json();
      return final;
         }
