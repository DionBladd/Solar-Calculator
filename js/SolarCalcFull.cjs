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
async function Main() {
 try
    let solarHours = parseFloat(await askQuestion("Enter value for Solar Hours in hours: "));                                       
    let solarQuantity = parseFloat(await askQuestion("Enter value for Solar Quantity: "));  
    let wattage = parseFloat(await askQuestion("Enter wattage of solar panels in watts: ")); }
    catch (error) {
          console.error("Error in input: ", error);
          return;
     
    }

async function ConsumptionProduction(){

//daily energy consumption    
   async function calculateDailyConsumption() {
                let totalenergy = 0;

       let count = await askQuestion("Enter the number of energy consumption items you want to input:");
        count = parseInt(count);
        for (let i =0; i< count; i++){ 
            

          const watts = await askQuestion(`Enter wattage for item ${i + 1}: `);
          const hours = await askQuestion(`Enter daily usage hours for item ${i + 1}: `);
          const energy = (parseFloat(watts) *parseFloat(hours)) / 1000; 
            totalenergy += energy;
        }
        console.log("Total Energy Consumption in kWh: " + totalenergy);
        return totalenergy;
    }
    
    // Calculate Daily Energy Production
    function calculateDailyEnergyProduction() {
        
        const totalWatthours = (solarHours * solarQuantity * wattage * efficiency);
        const energyProduction = totalWatthours / 1000; // production daily
        console.log("Daily Energy Production in kWh: " + energyProduction);
        return energyProduction;
    }
    
    // Call the functions to perform calculations
    // await calculateDailyConsumption();
    calculateDailyEnergyProduction();
                
}
    ConsumptionProduction();   
// Energy Output Calculation    
    async function EnergyOutput(){
//energy output  daily
    function calculateDailyEnergyOutput(){
        let energyd = 0;
    energyd= (wattage * solarHours * efficiency);
    console.log("Daily Energy Output in kWh: " + energyd);
    return energyd;
    }
//total daily energy output 
    function calculateTotalDailyEnergyOutput(){
        var totalEnergyd= numberOfPanels * DailyEnergyOutput;
        console.log("Total Daily Energy Output in kWh: " + totalEnergyd);   
        return totalEnergyd;
}
//monthly energy output
    async function calculateMonthlyEnergyOutput(){
        var days = await askQuestion("Enter number of days in the month: ");
        monthlyEnergyOutput = 0
    if(days <= 0){
        console.log("Please enter a valid number of days.");
    }
    else if(days == 28){
        var monthly = TotalDailyEnergyOutput * 28;
        console.log("Monthly Energy Output in kWh: " + monthly);
        monthlyEnergyOutput += monthly;
    }
    else if(days == 30){
        var monthly = TotalDailyEnergyOutput * 30;
        console.log("Monthly Energy Output in kWh: " + monthly);
        monthlyEnergyOutput += monthly;
    }
    else if(days == 31){
        var monthly = TotalDailyEnergyOutput * 31;
        console.log("Monthly Energy Output in kWh: " + monthly);
        monthlyEnergyOutput += monthly;
    }
    else{
        console.log("Please enter a valid number of days.");
    }

//number of panels 
    }
        
   async function calculateNumberOfPanels(){
    singlePanelCapacity = parseFloat(await askQuestion("Enter value for Single Panel Capacity in watts"));
    actualCapacitywatts =parseFloat(await askQuestion("Enter value for Actual Capacity in watts"));
        const no = actualCapacitywatts / siglePanelCapacity;
        numberOfPanels = no;
        console.log("Number of Panels required: " + numberOfPanels);
  }
//solar power capacity calculation  
    
        function calculateSolarPowerCapacity(){
        var pcapacity = wattage * solarQuantity * efficiency;
        capacityWatts += pcapacity; 
        console.log("Solar Power Capacity in watts: " + capacityWatts);
        }
// Calculate Actual Solar Power Capacity based on wattage, solar hours, solar quantity, and efficiency in 
// difference with just solar power capacity
        function calculateActualSolarPowerCapacity(){

        var actualpcapacity= (wattage * solarHours * solarQuantity * efficiency) / 1000; 
        actualCapacitywatts += actualpcapacity;
        console.log("Actual Solar Power Capacity in kWh: " + this.actualCapacitywatts);
        
    }

  //run functions
calculateNumberOfPanels();
calculateDailyEnergyOutput();
calculateTotalDailyEnergyOutput();
calculateMonthlyEnergyOutput();
calculateSolarPowerCapacity();
calculateActualSolarPowerCapacity()
}
// await EnergyOutput();
}
//run program function
//    await ConsumptionProduction();


//run main function
Main();



