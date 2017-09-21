var textContainer, textareaSize, input;
var count=1;
var autoSize = function (){
  count=countLine(input.value);
  if(count<6){
  textareaSize.innerHTML = input.value + '\n';
  }
  else{
    textContainer = document.querySelector('.textarea-container');
    textareaSize = textContainer.querySelector('.textarea-size');
    input = textContainer.querySelector('textarea');
    input.style.overflow="scroll";
    textareaSize.style.overflow="scroll";
  }
};

var countLine = function(input){
  enteredText = input;
  numberOfLineBreaks = (enteredText.match(/\n/g)||[]).length;
  return numberOfLineBreaks;
}

document.addEventListener('DOMContentLoaded', function() {
  textContainer = document.querySelector('.textarea-container');
  textareaSize = textContainer.querySelector('.textarea-size');
  input = textContainer.querySelector('textarea');
  autoSize();
  input.addEventListener('input', autoSize);
});
