(function() {
    var canvas, ctx, width, height, particles, particle_count, particle_max_size = 3,
        mouse = { x: 0, y: 0 }, colors = [], color_one, color_two;

    function init() {
        canvas = document.querySelector('.canvas-snake canvas');
        ctx = canvas.getContext('2d');
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        color_one = canvas.parentNode.getAttribute('data-colorone') || '#0b1115';
        color_two = canvas.parentNode.getAttribute('data-colortwo') || '#a4ff91';
        
        particles = [];
        particle_count = Math.floor(width * height / 5000);
        
        for(var i = 0; i < particle_count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                size: Math.random() * particle_max_size,
                color: Math.random() > 0.5 ? color_one : color_two
            });
        }
        
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        canvas.addEventListener('mouseout', function() {
            mouse.x = 0;
            mouse.y = 0;
        });
        
        canvas.addEventListener('click', function(e) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                size: Math.random() * particle_max_size,
                color: Math.random() > 0.5 ? color_one : color_two
            });
        });
        
        window.addEventListener('resize', function() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
        
        animate();
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for(var i = 0; i < particles.length; i++) {
            var p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;
            
            if(mouse.x && mouse.y) {
                var dx = mouse.x - p.x,
                    dy = mouse.y - p.y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 100) {
                    p.vx += dx * 0.01;
                    p.vy += dy * 0.01;
                }
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            for(var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j],
                    dx = p.x - p2.x,
                    dy = p.y - p2.y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('load', init);
})();