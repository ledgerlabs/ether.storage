// Import basic ethers.io libraries
importScripts("https://testnet.ethers.io/scripts/ethers-v0.1.js");

// Once the ethers environment is setup it will execute this function
ethers.ready(function() {    
    
    /* Start application code */
    var abi = {"SimpleStorage":[{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"string"}],"name":"setValue","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldValue","type":"string"},{"indexed":false,"name":"newValue","type":"string"}],"name":"valueChanged","type":"event"}]};

    var contract = new ethers.Contract('0xb79694861274f4755c788882150b28aD627bF69F', abi.SimpleStorage);
    
    ethers.notify('running');
    
    var input = document.createElement('input');
    document.body.appendChild(input);

    var output = document.createElement('div');
    document.body.appendChild(output);
    
    input.onkeyup = function(event) {
        
        if (event.which === 13) {
            var value = input.value;
            contract.setValue(value, function() {
                ethers.notify('Sent: ' + value);
            });
            input.value = '';
        }
    };
    
    contract.getValue().then(function (value) {
       output.textContent = value;
       ethers.notify('Got: ' + value);
    });
    
    contract.valueChanged(function(oldValue, newValue) {
        output.textContent = newValue;
        ethers.notify('Changed: ' + oldValue + ' => ' + newValue);
    });
    
    /* End application code */
    
});
