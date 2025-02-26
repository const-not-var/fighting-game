const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.6;
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        idleBackward: {
            imageSrc: './img/samuraiMack/Idle backward.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        runBackward: {
            imageSrc: './img/samuraiMack/Run backward.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        jumpBackward: {
            imageSrc: 'img/samuraiMack/Jump backward.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        fallBackward: {
            imageSrc: './img/samuraiMack/Fall backward.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        attack2: {
            imageSrc: './img/samuraiMack/Attack2.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }  
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    },
    attackBox2: {
        offset: {
            x: -200,
            y: 50
        },
        width: 150,
        height: 50
    }
});

const enemy = new Fighter({
    position: {
        x: 950,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        idleBackward: {
            imageSrc: './img/kenji/Idle backward.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        runBackward: {
            imageSrc: './img/kenji/Run-backward.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        jumpBackward: {
            imageSrc: './img/kenji/Jump backward.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        fallBackward: {
            imageSrc: './img/kenji/Fall backward.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: './img/kenji/Attack2.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        } 
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    },
    attackBox2: {
        offset: {
            x: 70,
            y: 50
        },
        width: 180,
        height: 50
    }
});



console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();
    // console.log("go");

    player.velocity.x = 0; // initial player velocity
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -9;
        player.switchSprite('runBackward');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.switchSprite('run');
        player.velocity.x = 9;
    } else if (player.lastKey === 'a') {
        player.switchSprite('idleBackward');
    } else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0 && player.lastKey === 'a') {
        player.switchSprite('jumpBackward');
    } else if (player.velocity.y < 0 && player.lastKey === 'd') {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0 && player.lastKey === 'a') {
        player.switchSprite('fallBackward');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
    
     // og movement code
    //    if (keys.a.pressed && player.lastKey === 'a') {
    //     player.scale.x = -1
    //     player.velocity.x = -9;
    //     player.switchSprite('run');
    // } else if (keys.d.pressed && player.lastKey === 'd') {
    //     player.velocity.x = 9;
    //     player.switchSprite('run');
    // } else player.switchSprite('idle');
    

    // if (player.velocity.y < 0) {
    //     player.switchSprite('jump');
    // } else if (player.velocity.y > 0) {
    //     player.switchSprite('fall');
    // }

    // jumping backward
    // if last key is d then jump backward

    // og enemy movement
    // if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    //     enemy.velocity.x = -6;
    //     enemy.switchSprite('run');
    // } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    //     enemy.velocity.x = 6;
    //     enemy.switchSprite('run');
    // } else {
    //     enemy.switchSprite('idle');
    // }

    // if (enemy.velocity.y < 0) {
    //     enemy.switchSprite('jump');
    // } else if (enemy.velocity.y > 0) {
    //     enemy.switchSprite('fall');
    // }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -9;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('runBackward');
        enemy.velocity.x = 9;
    } else if (enemy.lastKey === 'ArrowLeft') {
        enemy.switchSprite('idle');
    } else if (enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('idleBackward');
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0 && enemy.lastKey === 'ArrowLeft') {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y < 0 && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('jumpBackward');
    } else if (enemy.velocity.y > 0 && enemy.lastKey === 'ArrowLeft') {
        enemy.switchSprite('fall');
    } else if (enemy.velocity.y > 0 && enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('fallBackward');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // detect for collision & enemy gets hit
    
    if (player.lastKey === 'a') {
        if (
            backwardRecCollision({
                rectangle3: player,
                rectangle4: enemy
            })  &&
            player.isAttacking && player.framesCurrent === 2)
            
            {
                enemy.takeHit();
                player.isAttacking = false;
                
                gsap.to('#enemyHealth', {
                    width: enemy.health + '%'
                })
        }
    } else if (player.lastKey === 'd') {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            })  &&
            player.isAttacking && player.framesCurrent === 2)
            
            {
                enemy.takeHit();
                player.isAttacking = false;
                
                gsap.to('#enemyHealth', {
                    width: enemy.health + '%'
                })
        }
    }





    //if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }


    //where player gets hit



    if (enemy.lastKey === 'ArrowLeft') {
        if (
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player
            }) &&
            enemy.isAttacking && enemy.framesCurrent === 2) {
                player.takeHit();
                enemy.isAttacking = false;
                gsap.to('#playerHealth', {
                    width: player.health + '%'
                })
        }
    } else if (enemy.lastKey === 'ArrowRight') {
        if (
            backwardRecCollision({
                rectangle3: enemy,
                rectangle4: player
            }) &&
            enemy.isAttacking && enemy.framesCurrent === 2) {
                player.takeHit();
                enemy.isAttacking = false;
                gsap.to('#playerHealth', {
                    width: player.health + '%'
                })
        }
}






        //if enemy misses
        if (enemy.isAttacking && enemy.framesCurrent === 2) {
            enemy.isAttacking = false;
        }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({  player, enemy, timerId  });
    }
}



animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
    // console.log(event.key);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case 'w':
            player.velocity.y = -20;
            break
        case 's':
            player.attack();
            break

    }
}
    if (!enemy.dead) {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break
        case 'ArrowDown':
            enemy.attackP2();
            break
    }
}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
        case 'ArrowUp':
            enemy.velocity.y = 0;
            break
    }
    
    // console.log(event.key);
})