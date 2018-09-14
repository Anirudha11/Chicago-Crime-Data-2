const readline=require('readline');// using readline
const fs=require('fs');//using fs
      const rl = readline.createInterface({
      input: fs.createReadStream('./Crimes_-_2001_to_present.csv') //Read CSV file.
       });
       function remove(array,element){
         return array.filter(e=>e!==element);  //function to remove irrelevant commas
       }
       const v = [];
const mySet = new Set();
const myMap = new Map();
const hasrobbery = /ROBBERY/;
rl.on('line', (line) => {
  if (hasrobbery.test(line)) {
    const x = line.split(',');
    let index = x.indexOf('ROBBERY');
    index++;//index value is incremented to refer to the description header which stores the type of robbery
    const previousSize = mySet.size;
    mySet.add(x[index]);
    const afterSize = mySet.size;
    if (previousSize < afterSize) {
      myMap.set(x[index], 1);
    } else {
      const currentSize = myMap.get(x[index]);
      myMap.set(x[index], currentSize + 1);
    }
  }
});
rl.on('close', () => {
  const iterator1 = myMap[Symbol.iterator]();
  for (const item of iterator1) {
    const prop = {};
    prop.Type = item[0];
    prop.Count = item[1];
    v.push(prop);
  }
  console.log(v);
          var myJSON1 = JSON.stringify(v)       //JSON creation

          fs.writeFile("output3.json", myJSON1, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }
             });
              console.log("JSON3 file has been saved.");
});