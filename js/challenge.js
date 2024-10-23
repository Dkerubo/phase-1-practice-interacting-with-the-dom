document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById('counter');
    let minusButton = document.getElementById('minus');
    let plusButton = document.getElementById('plus');
    let heartButton = document.getElementById('heart');
    let pauseButton = document.getElementById('pause');
    let likesList = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentsList = document.getElementById('comments');
    
    let count = 0;
    let isPaused = false;
    let likeCounts = {};
    
    // Timer to increment the counter every second
    let timer = setInterval(incrementCounter, 1000);
    
    function incrementCounter() {
      if (!isPaused) {
        count++;
        counter.textContent = count;
      }
    }
    
    // Plus button
    plusButton.addEventListener('click', () => {
      count++;
      counter.textContent = count;
    });
  
    // Minus button
    minusButton.addEventListener('click', () => {
      count--;
      counter.textContent = count;
    });
  
    // Like button
    heartButton.addEventListener('click', () => {
      if (!likeCounts[count]) {
        likeCounts[count] = 1;
        const li = document.createElement('li');
        li.id = `like-${count}`;
        li.textContent = `${count} has been liked 1 time.`;
        likesList.appendChild(li);
      } else {
        likeCounts[count]++;
        const li = document.getElementById(`like-${count}`);
        li.textContent = `${count} has been liked ${likeCounts[count]} times.`;
      }
    });
  
    // Pause/Resume button
    pauseButton.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(timer);
        pauseButton.textContent = 'resume';
        disableButtons(true);
      } else {
        timer = setInterval(incrementCounter, 1000);
        pauseButton.textContent = 'pause';
        disableButtons(false);
      }
    });
  
    function disableButtons(disabled) {
      plusButton.disabled = disabled;
      minusButton.disabled = disabled;
      heartButton.disabled = disabled;
    }
  
    // Submit comment form
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentInput = document.getElementById('comment-input');
      const comment = commentInput.value;
      
      if (comment.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
      }
  
      commentInput.value = '';  // Clear input after submitting
    });
  });
  