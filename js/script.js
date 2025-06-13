document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const onGridRadio = document.getElementById('onGrid');
    const offGridRadio = document.getElementById('offGrid');    
    const hybridRadio = document.getElementById('hybrid');  
    const yearlyRadio = document.getElementById('yearly');          
    const monthlyRadio = document.getElementById('monthly');
    const dailyRadio = document.getElementById('daily');
    const consumptionInput = document.getElementById('consumption');               
    const calculateBtn = document.getElementById('calculateBtn');   
    const resetBtn = document.getElementById('resetBtn');
    const resultDiv = document.getElementById('result');
    const modeDisplay = document.getElementById('modeDisplay');

    // System parameters
    const solarHours = 14;
    const systemLoss = 0.3; 
    const panelWattage = 0.59; // in kWh
    const storage = 1.5;
    const solarFraction = 0.7;

    // Event listeners
    calculateBtn.addEventListener('click', calculatePanels);
    resetBtn.addEventListener('click', resetForm);
    [onGridRadio, offGridRadio, hybridRadio].forEach(radio => {
        radio.addEventListener('change', updateModeDisplay);
            });
    
    function calculatePanels() {
        // Get selected system type
        let system;
        if (onGridRadio.checked) system = 'onGrid';
        else if (offGridRadio.checked) system = 'offGrid';
        else if (hybridRadio.checked) system = 'hybrid';

        // Validate input
        const consumption = parseFloat(consumptionInput.value);
        if (isNaN(consumption) || consumption <= 0) {
            resultDiv.innerHTML = "Please enter a valid positive number";
            return;
        }

        // Calculate daily consumption
        let dailyConsumption;
        if (yearlyRadio.checked) {
            dailyConsumption = consumption / 365;
        }
        else if (monthlyRadio.checked) {
            dailyConsumption = consumption / 30;
        } 
        else if (dailyRadio.checked) {
            dailyConsumption = consumption;
        }

        // Calculate panels needed
        let panelsNeeded;
        if (system === 'onGrid') {
            panelsNeeded = dailyConsumption / panelWattage;
        } 
        else if (system === 'offGrid') {
            panelsNeeded = (dailyConsumption * storage * (1 + systemLoss)) / panelWattage;
        } 
        else if (system === 'hybrid') {
            panelsNeeded = (dailyConsumption * solarFraction * (1 + systemLoss)) / panelWattage;
        }

        // Display result
        resultDiv.innerHTML = `You need ${Math.ceil(panelsNeeded)} panels (590W each)`;
    }

    function resetForm() {
        consumptionInput.value = '';
        onGridRadio.checked = true;
        monthlyRadio.checked = true; // Changed to match HTML default
        resultDiv.innerHTML = '';
    }
    function updateModeDisplay() {
        if (onGridRadio.checked) {
            modeDisplay.textContent = "You are in onGrid mode";
        } else if (offGridRadio.checked) {
            modeDisplay.textContent = "You are in offGrid mode";
        } else if (hybridRadio.checked) {
            modeDisplay.textContent = "You are in Hybrid mode";
        }
    }                       
});