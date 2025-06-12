

async function main(){
    const { mainModule } = require('process');
const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}
    try{
         var consumptionDaily = parseFloat(await askQuestion("Enter your value for Daily Consumption in kwh: "));

         if (consumptionDaily === null || isNaN(consumptionDaily) || consumptionDaily <= 0) {
            console.log("Invalid input. Please enter a valid number greater than 0.");  
                    return;
    }
   
         const solarHours = 14;
  
         const systemLoss = 0.3;
  
         const panelWattage = 0.59; // in kwh
  
         const storage = 1.5;
  
         const solarFraction = 0.7;



    var mode = await askQuestion("Enter mode (onGrid, offGrid, Hybrid): ");

    if (mode !== "onGrid" && mode !== "offGrid" && mode !== "hybrid") {
        console.log("Invalid mode. Please enter 'onGrid', 'offGrid', or 'hybrid'.");
        return;
    
    }
    else if (mode === "onGrid") {
        console.log("You are in onGrid mode");
        console.log("You need " + onGrid() + " solar panels to meet your daily consumption.");

    }               
    else if (mode === "offGrid") {
        console.log("You are in offGrid mode");
        console.log("You need " + offGrid() + " solar panels to meet your daily consumption.");
    }
    else if (mode === "hybrid") 
        console.log("You are in Hybrid mode");
        console.log("You need " + hybrid() + " solar panels to meet your daily consumption.");
    
    

    function onGrid(){

        return consumptionDaily / panelWattage;           

    }


    function offGrid(){
        let totalNeededEnergy = consumptionDaily * storage * systemLoss;
        return totalNeededEnergy / (panelWattage *  solarHours);
}

    function hybrid(){
        let solarEnergyNeeded = consumptionDaily * solarFraction * systemLoss;
        return solarEnergyNeeded / (panelWattage * solarHours);
    }

}


    catch (error) {
        console.error("Error in input: ", error);
    }
}
main();