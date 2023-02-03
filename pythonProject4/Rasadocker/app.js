class Chatbox {

    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                 this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {

        var textField = chatbox.querySelector('input');

        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "user_uttered", message: text1 }
        this.messages.push(msg1);

         fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res =>{
              return res.json()
          })
             .then(data => {
                 let msg2 = {name: "bot_uttered", message: data[0].text }
                 this.messages.push(msg2)
                 console.log(data[0].text)
                 if(data[0].text === 'Hey! How are you?'){
                     console.log('Weather')
                 }

                 this.updateChatText(chatbox)
                 textField.value = ''
             })
             .catch(error => console.error('Error'))


    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "bot_uttered")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();