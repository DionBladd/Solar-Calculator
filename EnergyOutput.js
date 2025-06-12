class SolarCalculator1 {
    constructor(numberOfPanels, DailyEnergyOutput,solarPower, solarHours, solarQuantity, wattage, efficiency=0.85, siglePanelCapacity, actualCapacitywatts) {
        this.solarPower = solarPower; // in watts
        this.solarHours = solarHours; // in hours
        this.solarQuantity = solarQuantity; //quantity
        this.wattage = wattage; // in watts for solar panels 
        this.efficiency = efficiency; // efficiency of solar panels from my research varies from 0.75 to 0.85
        this.siglePanelCapacity= siglePanelCapacity;
        this.totalEnergyConsumption = 0// in kWh;
        this.DailyEnergyProduction=0;
        this.actualCapacitywatts = actualCapacitywatts;
        this.DailyEnergyOutput = DailyEnergyOutput;
        this.numberOfPanels = numberOfPanels;
        this.TotalDailyEnergyOutput =TotalDailyEnergyOutput;
    }
//Commercial Solar Panel Power Calculation

//calculates energy spent by solar panels daily by only one panel
calculateDailyEnergyOutput(wattage, solarHours, efficiency){

    const wattage = prompt("Enter wattage of solar panels in watts");
    const solarHours = prompt("Enter value for Solar Hours in hours");
    energykwh= (wattage * solarHours * this.efficiency);
    console.log("Daily Energy Output in kWh: " + energykws);
    this,DailyEnergyOutput = energykwh;
}
//calculates total energy output by all panels daily            
calculateTotalDailyEnergyOutput(numberOfPanels, DailyEnergyOutput){

    const numberOfPanels = prompt("Enter value for Number of Panels");
    var total= numberOfPanels * DailyEnergyOutput;
    console.log("Total Daily Energy Output in kWh: " + total);
    this.TotalDailyEnergyOutput += total;
}
//calculates monthly energy output by multiplying daily output by number of days in month
//in case of a 0, negative or invalid number of days, it will prompt user to enter a valid number                               
calculateMonthlyEnergyOutput(TotalDailyEnergyOutput, days){
    const days = prompt("Enter number of days in the month");
    if(days >= 0){
        console.log("Please enter a valid number of days.");
    }
    else if(days == 28 || days == 29){
        var monthly = TotalDailyEnergyOutput * 28;
        console.log("Monthly Energy Output in kWh: " + monthly);
        this.monthlyEnergyOutput += monthly;
    }
    else if(days == 30){
        var monthly = TotalDailyEnergyOutput * 30;
        console.log("Monthly Energy Output in kWh: " + monthly);
        this.monthlyEnergyOutput += monthly;
    }
    else if(days == 31){
        var monthly = TotalDailyEnergyOutput * 31;
        console.log("Monthly Energy Output in kWh: " + monthly);
        this.monthlyEnergyOutput += monthly;
    }
    else{
        console.log("Please enter a valid number of days.");
        
}
}
}
