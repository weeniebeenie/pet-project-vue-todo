export default {
    install(Vue) {
        function createMessage(text) {
            const oldMessage = document.querySelector('.message')

            if (oldMessage) {
                oldMessage.innerText = text
            } else {
                const newMessage = document.createElement('p')
                newMessage.classList.add('message')
                newMessage.append(text)

                document.querySelector('form').prepend(newMessage)
            }
        }

        Vue.prototype.$message = function(text) {
            createMessage(text)
        }

        Vue.prototype.$error = function(text) {
            createMessage(text = 'Error: ' + text)
        }
    }
}