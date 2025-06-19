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
    calculateBtn.addEventListener('click', calculatePanels);
    resetBtn.addEventListener('click', resetForm);





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
  const interactiveInputs = [
      ...document.querySelectorAll('input[type=radio]'),
      ...document.querySelectorAll('select')
  ];

  interactiveInputs.forEach(input => {
      input.addEventListener('change', function () {
          resultDiv.innerHTML = '';
          resultDiv.style.display = "none";
          modeDisplay.textContent = '';});
      });


    
function calculatePanels() {

<<<<<<< HEAD
        if (roofNo.checked) {
            resultDiv.innerHTML = `
        <div class="result-box">
            <p>Sorry, unfortunately you don't have enough space for solar panels.</p>
        </div>
    `;
    return;
}
=======

>>>>>>> 26f433b9ee82ae34d4a93b251ca6163d59eb92a7
    // Get selected system type
    let system;
    switch (true){
        case onGridRadio.checked:
        
            system = 'onGrid';
        
        break;
        case offGridRadio.checked:
        
            system='offGrid';
        
        break;
        case hybridRadio.checked
        :
        
            system = 'hybrid';
         
        break;
        default:
            console.error("No system selected");

    }

    const solarHoursInput = document.getElementById('solarHours');
    const solarHours = parseFloat(solarHoursInput.value);

    // Validate input
    const consumption = parseFloat(consumptionInput.value);
    if (isNaN(consumption) || consumption <= 0 || consumption === "") {
        resultDiv.innerHTML = "Please enter a valid positive number";
        return;
    }

    // Calculate daily consumption
    let dailyConsumption;


     switch(true){

        case yearlyRadio.checked:{
        
            dailyConsumption = consumption / 365;
        }
        break;
        
        case monthlyRadio.checked:{
        
            dailyConsumption = consumption / 30;}
            break;
        
            case dailyRadio.checked:{
            
            dailyConsumption = consumption;}
            break;
    
        default:
            console.error("No consumption given");

     }

    // Calculate panels needed
    let panelsNeeded;
    switch(true){
        case system === 'onGrid':
        {
            panelsNeeded = dailyConsumption / panelWattage+(panelWattage * solarHours);
        }
            break;
        case system === 'offGrid':
        {
            panelsNeeded = (dailyConsumption * storage * (1 + systemLoss)) / panelWattage+(panelWattage * solarHours);
        }
        break;
        case system === 'hybrid':
        {
            panelsNeeded = (dailyConsumption * solarFraction * (1 + systemLoss)) / panelWattage+(panelWattage * solarHours);
        }
        break;
        default:
            console.error("No panels required");
    }

    let batterysizekWh = 0;
    let batteryText = '';   

    switch(true)
    {
        case system === 'offGrid':
        {
            const autonomy = 0.5;
            batterysizekWh = dailyConsumption * autonomy * (1 - systemLoss);
        }
        break;
        case system === 'hybrid':
            {
                batterysizekWh = dailyConsumption * 0.7 * (1 - systemLoss);
            }
            break;
        default:
            console.error("no battery required");

    }


const batteryType = document.getElementById('batteryType').value;



if (batteryType === "gel") {
    if (batterysizekWh <= 5) {
        batteryText = `<p>Suggested: 1 x 100Ah gel battery (≈${Math.ceil(batterysizekWh/1.2)} batteries)</p>`;
    } 
    else if (batterysizekWh <= 15) {
        batteryText = `<p>Suggested: 1 x 200Ah gel battery (≈${Math.ceil(batterysizekWh/2.4)} batteries)</p>`;
    } 
    else {
        const num200Ah = Math.floor(batterysizekWh/2.4);
        const remaining = batterysizekWh % 2.4;
        const num100Ah = Math.ceil(remaining/1.2);
        batteryText = `<p>Suggested: ${num200Ah} x 200Ah + ${num100Ah} x 100Ah gel batteries</p>`;
    }
} 
else if (batteryType === "lithium") {
    if (batterysizekWh <= 5) {
        batteryText = `<p>Suggested: 1 x 5kWh lithium battery</p>`;
    } 
    else if (batterysizekWh <= 15) {
        batteryText = `<p>Suggested: 1 x 15kWh lithium battery</p>`;
    } 
    else {
        const num15kWh = Math.floor(batterysizekWh/15);
        const remaining = batterysizekWh % 15;
        const num5kWh = Math.ceil(remaining/5);
        batteryText = `<p>Suggested: ${num15kWh} x 15kWh + ${num5kWh} x 5kWh lithium batteries</p>`;
    }
}


    // Display result
    const selectedOption = solarHoursInput.options[solarHoursInput.selectedIndex];
    const hoursText = selectedOption.text;

resultDiv.style.display = "block";
resultDiv.innerHTML = `
  <div class="result-box">
    <p><em>Calculating...</em> ⏳</p>
  </div>
`;
// Delay the real result for 3 seconds
setTimeout(() => {
    resultDiv.style.display = "grid";
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
        switch(true)
{
    case onGridRadio.checked:
        {
            modeDisplay.textContent = "You are in onGrid mode";
        }
        break;
    case offGridRadio.checked:
        {
            modeDisplay.textContent = "You are in offGrid mode";
        }
        break;
    case hybridRadio.checked:
        {
            modeDisplay.textContent = "You are in Hybrid mode";
        }
        break;
        default:
            console.error("Select the mode!")
} 
    }  
                    
});