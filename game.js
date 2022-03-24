class Game {

    static active = 1;
    static square;

    static rand = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static array25 = () => {
        const arr25 = new Set();
        do {
            arr25.add(this.rand(1, 25));
        } while (arr25.size < 25);
        return [...arr25];
    }

    static numberToPlace(n, l, px = 100, pad = 15) {
        const top = parseInt(n / 5) * px + pad;
        const left = 4 * px - (n % 5) * px + l + pad;
        return [top + 'px', left + 'px'];
    }

    static loadGame() {
        this.square = document.createElement('div');
        this.square.classList.add('square');
        document.querySelector('body').appendChild(this.square);
        this.fillWithNewBalls(this.square);
    }

    static fillWithNewBalls(square) {
        const a25 = this.array25();
        a25.forEach((n, i) => {
            const ball = document.createElement('div');
            ball.style.top = this.numberToPlace(i, 0)[0]
            ball.style.left = this.numberToPlace(i, 0)[1];
            const ballId = n;
            const number = document.createTextNode(ballId);
            ball.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ball.appendChild(number);
            ball.addEventListener('click', e => {
                this.ballClick(ballId, e.target);
            });
            square.appendChild(ball);
        })
    }

    static ballClick(id, ball) {
        if (id == this.active) {
            this.active++;
            ball.style.top = this.numberToPlace(id - 1, 600)[0]
            ball.style.left = this.numberToPlace(id - 1, 600)[1];
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    Game.loadGame();
});