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

async function ConsumptionProduction(){
    const efficiency = 0.85;
    let solarQuantity = parseFloat(await askQuestion("Enter value for Solar Quantity:"));  
    let wattage = parseFloat(await askQuestion("Enter wattage of solar panels in watts:"));    

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
    await calculateDailyConsumption();
    calculateDailyEnergyProduction();
                
}
    ConsumptionProduction();   