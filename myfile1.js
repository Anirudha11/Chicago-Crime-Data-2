const readline=require('readline');// using readline
const fs=require('fs');//using fs
      const rl = readline.createInterface({
      input: fs.createReadStream('./Crimes_-_2001_to_present.csv') //Read CSV file.
       });
       function remove(array,element){
         return array.filter(e=>e!==element);  //function to remove irrelevant commas
       }
       const rob = new Array(16);
const burg = new Array(16);
const v = [];
rob.fill(0);
burg.fill(0);
        rl.on('line', (line) => {
          let s;
          let index;
if (line.search('ROBBERY') !== -1) {
    s = line.split(',');

    for (let i = 0; i < s.length; i++) {
      if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
        index = Number(s[i]);
        break;
      }
    }
    index -= 2001;
    rob[index] += 1;
  }
                  if (line.search('BURGLARY') !== -1) {
                  s = line.split(',');

                   for (let i = 0; i < s.length; i++) {
                   if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
                   index = Number(s[i]);
                    break;
                  }
                }
                  index -= 2001;
    burg[index] += 1;
  }
});
        rl.on('close',()=>{

          for (let i = 0; i < burg.length; i++) {
    const obj = {
      YEAR: '',
      ROBBERY: 0,
      BURGLARY: 0,
    };
    const year = 2000 + i + 1;
    obj.YEAR = year;
    obj.BURGLARY = burg[i];
    obj.ROBBERY = rob[i];
    v.push(obj);
  }
  const obj2 = {
    Primary_type: v,
  };         

            console.log(v);
          var myJSON1 = JSON.stringify(v)       //JSON creation

          fs.writeFile("output1.json", myJSON1, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }
             });
              console.log("JSON1 file has been saved.");
          });