(function() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
  
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    // 生成明亮的随机颜色
    const getRandomBrightColor = () => {
      const colors = ['#FF5733', '#FFEB3B', '#00FF00', '#00FFFF', '#FF1493', '#FF6347', '#FFD700'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
  
    // 使用 ln(x) 关系来生成气泡大小
    const getBubbleSize = (speed) => {
      return Math.min(Math.max(5, speed * 30), 100);  // 小气泡最小5px，大气泡最大100px
    };
  
    let lastMousePosition = { x: 0, y: 0 };
    let lastMoveTime = 0;
  
    // 生成气泡
    const createBubble = (x, y, size) => {
      let bubble = document.createElement('div');
      bubble.style.position = 'absolute';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.borderRadius = '50%'; // 保证气泡是圆形的
      bubble.style.backgroundColor = getRandomBrightColor(); // 使用明亮的颜色
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2 + window.scrollY}px`; // 使用 window.scrollY 来考虑滚动位置
      bubble.style.pointerEvents = 'none';
      bubble.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
      document.body.appendChild(bubble);
  
      // 设置气泡动画
      setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = `scale(${Math.random() * 1.5 + 0.5}) translateY(-100px)`;
      }, 10);
  
      // 删除气泡
      setTimeout(() => {
        document.body.removeChild(bubble);
      }, 1000);
    };
  
    // 监听鼠标移动事件
    document.addEventListener('mousemove', (e) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastMoveTime;
  
      // 降低气泡生成的频率（减少气泡数量），只有当时间差大于70ms时才生成气泡
      if (deltaTime > 70) {  // 使气泡生成间隔更长，减少气泡数量
        const dx = e.clientX - lastMousePosition.x;
        const dy = e.clientY - lastMousePosition.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / deltaTime;  // 计算鼠标的移动速度
  
        const bubbleSize = getBubbleSize(speed); // 根据速度调整气泡大小
        createBubble(e.clientX, e.clientY, bubbleSize);
  
        lastMousePosition = { x: e.clientX, y: e.clientY };
        lastMoveTime = currentTime;
      }
    });
  
    // 监听触摸事件，支持触摸设备
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const currentTime = Date.now();
      const deltaTime = currentTime - lastMoveTime;
  
      if (deltaTime > 70) {  // 降低气泡生成的频率（减少气泡数量）
        const dx = touch.clientX - lastMousePosition.x;
        const dy = touch.clientY - lastMousePosition.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / deltaTime;  // 计算鼠标的移动速度
  
        const bubbleSize = getBubbleSize(speed); // 根据速度调整气泡大小
        createBubble(touch.clientX, touch.clientY, bubbleSize);
  
        lastMousePosition = { x: touch.clientX, y: touch.clientY };
        lastMoveTime = currentTime;
      }
    });
  })();
  