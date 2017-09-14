var app = new Vue({
    el: '#interface',
    data: {
        command: "",
        commands: [],
    },
    methods: {
        addCommand: function() {
            this.commands = this.command.replace( /\n/g, " " ).split(" ");
        },
        sendCommand: function () {
            var commands = interpret(this.command);
            executeCommandsOnSprite(window.sprite, commands);
        }

    }
});