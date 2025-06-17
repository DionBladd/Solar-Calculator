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
    const roofYes = document.getElementById('roofYes');
    const roofNo = document.getElementById('roofNo');
    const batteryType = document.getElementById('batteryType').value;



    // System parameters

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
        roofNo.addEventListener('change', function() {
            if (roofNo.checked) {
                resultDiv.innerHTML = `
            <div class="result-box">
                <p>Sorry, unfortunately you don't have enough space for solar panels.</p>
            </div>
        `;
            }
        });     
        roofYes.addEventListener('change', function() {
    if (roofYes.checked) {
        resultDiv.innerHTML = ''; // Clear the "no space" message
    }
});
    // Disable calculate button if no roof space is selected        
roofNo.addEventListener('change', function() {
    calculateBtn.disabled = roofNo.checked; // Disable button if no roof space
});

roofYes.addEventListener('change', function() {
    calculateBtn.disabled = !roofYes.checked; // Re-enable button
});
    
function calculatePanels() {

        if (roofNo.checked) {
            resultDiv.innerHTML = `
        <div class="result-box">
            <p>Sorry, unfortunately you don't have enough space for solar panels.</p>
        </div>
    `;
    return;
}
    // Get selected system type
    let system;
    if (onGridRadio.checked) system = 'onGrid';
    else if (offGridRadio.checked) system = 'offGrid';
    else if (hybridRadio.checked) system = 'hybrid';

    const solarHoursInput = document.getElementById('solarHours');
    const solarHours = parseFloat(solarHoursInput.value);

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
    } else if (monthlyRadio.checked) {
        dailyConsumption = consumption / 30;
    } else if (dailyRadio.checked) {
        dailyConsumption = consumption;
    }

    // Calculate panels needed
    let panelsNeeded;
    if (system === 'onGrid') {
        panelsNeeded = dailyConsumption / panelWattage+(panelWattage * solarHours);
    } else if (system === 'offGrid') {
        panelsNeeded = (dailyConsumption * storage * (1 + systemLoss)) / panelWattage+(panelWattage * solarHours);
    } else if (system === 'hybrid') {
        panelsNeeded = (dailyConsumption * solarFraction * (1 + systemLoss)) / panelWattage+(panelWattage * solarHours);
    }

    let batterysizekWh = 0;
    let batteryText = '';   
    if (system === 'offGrid' ){
        const autnomyDays = 2; // Example autonomy days 
        batterysizekWh = dailyConsumption * autnomyDays * (1 + systemLoss);}
        else if (system === 'hybrid') {
                    batterysizekWh = dailyConsumption * 0.7 * (1 + systemLoss); 

    if (system !== 'onGrid' ) { 
        batteryText += `<p>Battery storage recommended: <strong> ${batterysizekWh.toFixed(1)}kWh</strong> </p>`;

        if (batterysizekWh <= 5) {
         batteryText = `<p>Suggested: 1 x Lithium 5kWh (100A) or multiple Gel 100Ah batteries</p>`;
    } else if (batterysizekWh <= 15) {
        batteryText = `<p>Suggested: 1 x Lithium 15kWh (200A) or mix of Gel 200Ah & 100Ah batteries</p>`;
    } else {
        batteryText = `<p>Suggested: Multiple Lithium 15kWh batteries or large gel bank (custom design)</p>`;
    }
}}

    // Display result
    const selectedOption = solarHoursInput.options[solarHoursInput.selectedIndex];
    const hoursText = selectedOption.text;

resultDiv.innerHTML = `
  <div class="result-box">
    <p><em>Calculating...</em> ⏳</p>
  </div>
`;

// Delay the real result for 3 seconds
setTimeout(() => {
    resultDiv.innerHTML = `
        <div class="result-grid">
            <div class="grid-item">
                <div class="grid-label">Panels Needed</div>
                <div class="grid-value">${Math.ceil(panelsNeeded)}</div>
            </div>
            <div class="grid-item">
                <div class="grid-label">Panel Wattage</div>
                <div class="grid-value">590W</div>
            </div>
            <div class="grid-item">
                <div class="grid-label">Sunlight Hours</div>
                <div class="grid-value">${selectedOption.text}</div>
            </div>
            <div class="grid-item">
                <div class="grid-label">System Type</div>
                <div class="grid-value">${system}</div>
            </div>
            <div class="grid-item">
                <div class="grid-label">Battery Size</div>
                <div class="grid-value  ">${batterysizekWh.toFixed(1)} kWh. ${batteryText}</div>
        </div>
    `;
}, 3000);
}

    function resetForm() {
        consumptionInput.value = '';
        onGridRadio.checked = true;
        monthlyRadio.checked = true; // Changed to match HTML default
        resultDiv.innerHTML = '';
        roofYes.checked = true;
document.getElementById('solarHours').selectedIndex = 0;
 updateModeDisplay();

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