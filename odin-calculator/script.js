const CALC = {
    buttons: [
    'btn_0',
    'btn_1',
    'btn_2',
    'btn_3',
    'btn_4',
    'btn_5',
    'btn_6',
    'btn_7',
    'btn_8',
    'btn_9',
    'btn_backspace',
    'btn_divide',
    'btn_multiply',
    'btn_subtract',
    'btn_add',
    'btn_operate',
    'btn_decimal',
],
    keys: {
        number: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
        ],
        operate: [
            '+',
            '-',
            '*',
            '/',
            '.',
            'Enter',
            'Backspace',
        ]
    }
}
    
let equation = {
    firstTerm: document.getElementById('firstTerm'),
    secondTerm: document.getElementById('secondTerm'),
    operation: document.getElementById('operation'),
    operate: function(){
        if(this.firstTerm.innerText && this.operation.innerText && this.secondTerm.innerText){
            //dostuff
        };
    },
    backspace: function(){
        let target = this.activeTerm();
        target.innerText = target.innerText.slice(0,target.innerText.length-1);
    },
    calcInput: function(inputRequest){
        const operationRegex = /\+|\-|\/|\*/
        switch(inputRequest){
            case 'Enter':

                break;
            case 'Backspace':
                this.backspace()
                break;
            case '.':

                break;
        }
        if(inputRequest.match(operationRegex)){

        }else if(inputRequest.match(/[0-9]/)){
            this.activeTerm().innerText += inputRequest
        }
    },
    activeTerm: function(){
        if(this.secondTerm.innerText){
            return this.secondTerm
        }else if(this.operation.innerText){
            return this.operation
        }else if(this.firstTerm.innerText){
            return this.firstTerm
        }
    }
}

function setInputEventListeners(buttons){
    for(i = 0; i < buttons.length; i++){
        document.getElementById(buttons[i]).addEventListener(('click'), (event) => {handleBtnClick(event.target)})
    }
    document.addEventListener(('keydown'), (event) => {handleKeyDown(event.key)})
}

setInputEventListeners(CALC.buttons, CALC.keys);

function handleBtnClick(htmlTarget){
    var targetText = htmlTarget.innerText
    if(targetText == '<-'){
        targetText = 'Backspace'
    }else if(targetText == '='){
        targetText = 'Enter'
    }
    equation.calcInput(targetText);
};

function handleKeyDown(keyRequest){
    console.log(keyRequest)
    if (CALC.keys.number.includes(keyRequest) || CALC.keys.operate.includes(keyRequest)){
        equation.calcInput(keyRequest)
    };
};