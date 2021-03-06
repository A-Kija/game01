class Game {

    static active = 1;
    static square;
    static indicator;
    static onAir = 0;

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
        return { top: top + 'px', left: left + 'px' };
    }

    static loadGame() {

        this.square = document.createElement('div');
        this.square.classList.add('square');
        document.querySelector('body').appendChild(this.square);
        this.indicator = document.createElement('div');
        this.indicator.classList.add('indicator');
        this.square.appendChild(this.indicator);
        this.fillWithNewBalls();
    }

    static color() {
        const c = this.rand(10, 20);
        const a = [];
        for (let i = 0; i < c; i++) {
            a.push('#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, 0));
        }
        return { backgroundImage: `linear-gradient(${this.rand(0, 180)}deg, ${a})` };
    }

    static move() {
        const a = [
            Math.random().toFixed(2),
            (Math.random() * 3 - 1.5).toFixed(2),
            Math.random().toFixed(2),
            (Math.random() * 3 - 1.5).toFixed(2)
        ];
        return { transition: `all 5s cubic-bezier(${a})` };
    }

    static hop(e) {
        return {
            top: (parseInt(e.style.top) - 100) + 'px',
            transition: 'all 0.2s'
        }
    }

    static indicatorControl(mode) {
        if (mode == 'full') {
            Object.assign(this.indicator.style, {
                width: 'calc(100% + 2px)',
                transitionProperty: 'none',
                transitionDuration: '0s'
            });
        } else if (mode == 'empty') {
            Object.assign(this.indicator.style, {
                width: '0px',
                transitionProperty: 'none',
                transitionDuration: '0s'
            });

        } else if (mode == 'drain') {
            this.indicatorControl('full');
            setTimeout(() => { //TODO pakeisti ?? Window.requestAnimationFrame()
                Object.assign(this.indicator.style, {
                    width: '0px',
                    transitionProperty: 'all',
                    transitionDuration: '5s'
                });
            }, 10)
        }
    }

    static goOnAir(dir) {
        this.onAir += dir;
        if (this.onAir == 1) {
            this.indicatorControl('drain');
        } else if (this.onAir > 1) {
            this.indicatorControl('full');
        } else {
            this.indicatorControl('empty');
            this.active = 0;
        }
    }

    static fillWithNewBalls() {
        this.array25().forEach((n, i) => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            Object.assign(ball.style, {...this.numberToPlace(i, 0), ...this.color() });
            ball.appendChild(document.createTextNode(n));
            ball.addEventListener('click', e => {
                this.ballClick(n, e.target);
            });
            this.square.appendChild(ball);
        })
    }

    static ballClick(id, ball) {
        if (id == this.active) {
            this.goOnAir(1);
            this.active++;
            Object.assign(ball.style, {...this.hop(ball) });
            setTimeout(() => Object.assign(ball.style, {...this.numberToPlace(id - 1, 600), ...this.move() }), 200);
            setTimeout(() => this.goOnAir(-1), 5200);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    Game.loadGame();
});