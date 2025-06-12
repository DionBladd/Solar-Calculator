class SolarCalculator2 {
    constructor(solarHours, solarQuantity, solarPower, wattage, efficiency=0.85, capacityWatts=0, actualCapacitywatts=0) {
        this.solarPower = solarPower; 
        this.solarHours = solarHours;
        this.solarQuantity = solarQuantity;
        this.wattage = wattage;
        this.efficiency = efficiency;
        this.capacityWatts = capacityWatts;
        this.actualCapacitywatts = actualCapacitywatts;
        calculateSolarPowerCapacity();
        calculateActualSolarPowerCapacity();
    }
        // Calculate Solar Power Capacity based on wattage, solar quantity, and efficiency 
        calculateSolarPowerCapacity(wattage, solarQuantity, efficiency){
        const solarQuantity = prompt("Enter value for Solar Quantity");
        const wattage = prompt("Enter wattage of solar panels in watts");
        var capacity = wattage * solarQuantity * efficiency;
        this.capacityWatts += capacity; 
        console.log("Solar Power Capacity in watts: " + this.capacityWatts);
        }
        // Calculate Actual Solar Power Capacity based on wattage, solar hours, solar quantity, and efficiency in 
        // difference with just solar power capacity
        calculateActualSolarPowerCapacity( wattage, solarHours, solarQuantity, efficiency){

        const solarQuantity = prompt("Enter value for Solar Quantity");
        const wattage = prompt("Enter wattage of solar panels in watts");
        const solarHours = prompt("Enter value for Solar Hours in hours");
        var actualcapacity= (wattage * solarHours * solarQuantity * efficiency) / 1000; 
        this.actualCapacitywatts += actualcapacity;
        console.log("Actual Solar Power Capacity in kWh: " + this.actualCapacitywatts);
        }






}