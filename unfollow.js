(async () => {
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    let totalUnfollowed = 0;
    let scrollTries = 0;
  
    console.log("🚀 Starting stable top-down unfollower...");
  
    while (scrollTries < 10) {
      const spans = Array.from(document.querySelectorAll('span'))
        .filter(span => span.innerText.trim().toLowerCase() === 'following');
  
      const buttons = spans.map(span => {
        let el = span;
        while (el && el.getAttribute('role') !== 'button') el = el.parentElement;
        return el;
      }).filter(Boolean);
  
      if (buttons.length === 0) {
        scrollTries++;
        console.log(`⬇️ No buttons found. Scroll attempt ${scrollTries}/10`);
        window.scrollBy(0, 500);
        await delay(2000);
        continue;
      }
  
      for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await delay(random(400, 800));
  
        btn.click();
        console.log(`🟡 Clicked 'Following' button #${totalUnfollowed + 1}`);
        await delay(random(500, 1000));
  
        const confirm = Array.from(document.querySelectorAll('div'))
          .find(div => div.innerText.trim() === 'Unfollow' && getComputedStyle(div).cursor === 'pointer');
  
        if (confirm) {
          confirm.click();
          console.log(`✅ Confirmed unfollow #${++totalUnfollowed}`);
        } else {
          console.warn("❌ Couldn’t find confirm button");
        }
  
        await delay(random(1500, 2200));
      }
  
      // After processing current batch, scroll slightly
      window.scrollBy(0, random(300, 500));
      await delay(1500);
      scrollTries = 0; // reset since we found buttons
    }
  
    console.log(`🎉 Finished. Total unfollowed: ${totalUnfollowed}`);
  })();
