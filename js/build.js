/**
 * OtterDrift — Build Your Drift Experience
 * Multi-step buyer flow with personalization logic
 * Single base plan — addons shape the final named plan and price
 */

(function () {
  'use strict';

  // ——————————————————————————————
  // State
  // ——————————————————————————————
  var state = {
    currentStep: 1,
    basePrice: 49,
    selectedLifestyles: [],
    selectedEnhancers: [],
  };

  // ——————————————————————————————
  // Hidden pricing (never shown per-item)
  // ——————————————————————————————
  var enhancerPricing = {
    'flow-management': 10,
    'digital-safety': 10,
    'guest-access': 5,
    'extended-reach': 15,
    'quiet-focus': 5,
  };

  var lifestylePricing = {
    'busy-household': 5,
    'home-office': 5,
    streaming: 5,
    gaming: 10,
    'smart-home': 5,
  };

  // ——————————————————————————————
  // Plan naming and identity
  // ——————————————————————————————
  var planIdentities = {
    'busy-household': {
      name: 'Family',
      label: 'OtterDrift Family',
      tagline: 'Built for busy homes',
    },
    'home-office': {
      name: 'Pro',
      label: 'OtterDrift Pro',
      tagline: 'Built for focused work',
    },
    streaming: {
      name: 'Stream',
      label: 'OtterDrift Stream',
      tagline: 'Built for entertainment lovers',
    },
    gaming: {
      name: 'Gamer',
      label: 'OtterDrift Gamer',
      tagline: 'Built for immersive play',
    },
    'smart-home': {
      name: 'Connected',
      label: 'OtterDrift Connected',
      tagline: 'Built for the smart home',
    },
  };

  // Priority order for naming when multiple lifestyles selected
  var namingPriority = ['gaming', 'busy-household', 'home-office', 'streaming', 'smart-home'];

  function getPlanName() {
    var lifestyles = state.selectedLifestyles;
    if (lifestyles.length === 0) return { label: 'OtterDrift', tagline: 'Your personalized experience' };

    // Find primary and secondary based on priority
    var primary = null;
    var secondary = null;
    for (var i = 0; i < namingPriority.length; i++) {
      if (lifestyles.indexOf(namingPriority[i]) !== -1) {
        if (!primary) {
          primary = namingPriority[i];
        } else if (!secondary) {
          secondary = namingPriority[i];
          break;
        }
      }
    }

    var plan = planIdentities[primary];
    if (!plan) return { label: 'OtterDrift', tagline: 'Your personalized experience' };

    if (secondary && lifestyles.length > 1) {
      var secondaryPlan = planIdentities[secondary];
      return {
        label: 'OtterDrift ' + plan.name + ' + ' + secondaryPlan.name,
        tagline: plan.tagline + ' and ' + secondaryPlan.tagline.replace('Built for ', ''),
      };
    }

    if (lifestyles.length > 1 && !secondary) {
      return { label: plan.label, tagline: plan.tagline };
    }

    return { label: plan.label, tagline: plan.tagline };
  }

  // ——————————————————————————————
  // Data: Experience descriptions
  // ——————————————————————————————
  var lifestyleData = {
    'busy-household': { name: 'Busy household', icon: '👨‍👩‍👧‍👦' },
    'home-office': { name: 'Home office', icon: '💼' },
    streaming: { name: 'Streaming & entertainment', icon: '🎬' },
    gaming: { name: 'Gaming & immersive', icon: '🎮' },
    'smart-home': { name: 'Smart home', icon: '🏠' },
  };

  var enhancerData = {
    'flow-management': { name: 'Intelligent flow management', icon: '🌀' },
    'digital-safety': { name: 'Digital safety & protection', icon: '🛡️' },
    'guest-access': { name: 'Guest access control', icon: '👋' },
    'extended-reach': { name: 'Outdoor & extended reach', icon: '🌳' },
    'quiet-focus': { name: 'Quiet & focus modes', icon: '🌙' },
  };

  // ——————————————————————————————
  // Narrative generation — solves real household problems
  // ——————————————————————————————
  function generateNarrative() {
    var lifestyles = state.selectedLifestyles;
    var enhancers = state.selectedEnhancers;

    // Primary lifestyle determines the core narrative
    var primary = null;
    for (var i = 0; i < namingPriority.length; i++) {
      if (lifestyles.indexOf(namingPriority[i]) !== -1) {
        primary = namingPriority[i];
        break;
      }
    }

    var narratives = {
      'busy-household':
        'No more arguing over who gets the connection. Your Family experience gives every person in the house their own seamless flow — kids doing homework, parents on video calls, someone streaming in the living room — all running beautifully at the same time, without anyone slowing each other down.',
      'home-office':
        'Video calls that never freeze. Uploads that don\'t crawl. Your Pro experience gives your work the dedicated, uninterrupted flow it deserves — so you can focus on the meeting, the deadline, or the creative work without ever thinking about what\'s powering it.',
      streaming:
        'No more buffering. No more "loading" screens during the best part. Your Stream experience delivers smooth, uninterrupted entertainment on every screen in the house — whether it\'s movie night in the living room or someone catching up on a series in bed.',
      gaming:
        'Lag-free, responsive, and built for the moments that matter most in play. Your Gamer experience keeps your connection fluid and consistent — so your gameplay feels as sharp as your skills, whether you\'re in competitive matches or downloading massive worlds.',
      'smart-home':
        'Every smart device, every automation, working in perfect harmony. Your Connected experience keeps cameras, speakers, thermostats, locks, and everything else flowing together reliably — so your home truly thinks ahead without hiccups or dropped connections.',
    };

    var narrative = narratives[primary] || 'Your OtterDrift experience is shaped entirely around the way you live — seamless, adaptive, and effortlessly personal.';

    // Add secondary lifestyle context
    var secondaryLifestyles = [];
    for (var j = 0; j < lifestyles.length; j++) {
      if (lifestyles[j] !== primary) {
        secondaryLifestyles.push(lifestyles[j]);
      }
    }

    if (secondaryLifestyles.length > 0) {
      var secondaryPhrases = {
        'busy-household': 'keeping every member of your household flowing without friction',
        'home-office': 'giving your work-from-home life the dedicated focus it needs',
        streaming: 'delivering buffer-free entertainment on every screen',
        gaming: 'keeping your gaming responsive and immersive',
        'smart-home': 'keeping every smart device running in harmony',
      };

      var phrases = [];
      for (var k = 0; k < secondaryLifestyles.length; k++) {
        if (secondaryPhrases[secondaryLifestyles[k]]) {
          phrases.push(secondaryPhrases[secondaryLifestyles[k]]);
        }
      }

      if (phrases.length > 0) {
        narrative += ' Plus, it\'s optimized for ' + formatList(phrases) + '.';
      }
    }

    // Add enhancer context
    if (enhancers.length > 0) {
      var enhancerPhrases = [];
      if (enhancers.indexOf('flow-management') !== -1) {
        enhancerPhrases.push('intelligent flow management that learns your daily rhythm');
      }
      if (enhancers.indexOf('digital-safety') !== -1) {
        enhancerPhrases.push('built-in digital protection for every device');
      }
      if (enhancers.indexOf('guest-access') !== -1) {
        enhancerPhrases.push('easy guest access that keeps your network separate and secure');
      }
      if (enhancers.indexOf('extended-reach') !== -1) {
        enhancerPhrases.push('extended coverage that reaches your backyard, garage, and patio');
      }
      if (enhancers.indexOf('quiet-focus') !== -1) {
        enhancerPhrases.push('quiet modes that reduce distractions on your schedule');
      }

      if (enhancerPhrases.length > 0) {
        narrative += ' All enhanced with ' + formatList(enhancerPhrases) + '.';
      }
    }

    return narrative;
  }

  function formatList(items) {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + ' and ' + items[1];
    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
  }

  // ——————————————————————————————
  // Calculate total price (hidden logic)
  // ——————————————————————————————
  function calculateTotal() {
    var total = state.basePrice;

    state.selectedLifestyles.forEach(function (ls) {
      if (lifestylePricing[ls]) {
        total += lifestylePricing[ls];
      }
    });

    state.selectedEnhancers.forEach(function (en) {
      if (enhancerPricing[en]) {
        total += enhancerPricing[en];
      }
    });

    return total;
  }

  // ——————————————————————————————
  // DOM References
  // ——————————————————————————————
  var steps = document.querySelectorAll('.build-step');
  var progressSteps = document.querySelectorAll('.build-nav__step');

  // Step 1 (Foundation)
  var step1Next = document.getElementById('step1Next');

  // Step 2 (Lifestyle)
  var lifestyleCards = document.querySelectorAll('.lifestyle-card');
  var step2Next = document.getElementById('step2Next');
  var step2Back = document.getElementById('step2Back');
  var step2Hint = document.getElementById('step2Hint');

  // Step 3 (Enhancers)
  var enhancerCards = document.querySelectorAll('.enhancer-card');
  var step3Next = document.getElementById('step3Next');
  var step3Back = document.getElementById('step3Back');
  var step3Hint = document.getElementById('step3Hint');

  // Step 4 (Summary & Checkout)
  var step4Back = document.getElementById('step4Back');
  var checkoutBtn = document.getElementById('checkoutBtn');
  var applePayBtn = document.getElementById('applePayBtn');
  var checkoutForm = document.getElementById('checkoutForm');
  var summaryContainer = document.getElementById('summaryContainer');
  var step4Actions = document.getElementById('step4Actions');
  var submitOrder = document.getElementById('submitOrder');
  var applePayBtnCheckout = document.getElementById('applePayBtnCheckout');
  var confirmationScreen = document.getElementById('confirmationScreen');

  // Summary elements
  var summaryTitle = document.getElementById('summaryTitle');
  var summaryNarrative = document.getElementById('summaryNarrative');
  var summaryBase = document.getElementById('summaryBase');
  var summaryLifestyle = document.getElementById('summaryLifestyle');
  var summaryEnhancers = document.getElementById('summaryEnhancers');
  var summaryPrice = document.getElementById('summaryPrice');

  // ——————————————————————————————
  // Step Navigation
  // ——————————————————————————————
  function goToStep(stepNumber) {
    state.currentStep = stepNumber;

    // Update step visibility
    steps.forEach(function (step) {
      var sn = parseInt(step.getAttribute('data-step'));
      step.classList.remove('build-step--active', 'build-step--visible');
      if (sn === stepNumber) {
        step.classList.add('build-step--active');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            step.classList.add('build-step--visible');
          });
        });
      }
    });

    // Update progress nav
    progressSteps.forEach(function (ps) {
      var sn = parseInt(ps.getAttribute('data-step'));
      ps.classList.remove('build-nav__step--active', 'build-nav__step--completed');
      if (sn === stepNumber) {
        ps.classList.add('build-nav__step--active');
      } else if (sn < stepNumber) {
        ps.classList.add('build-nav__step--completed');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Build summary if on step 4
    if (stepNumber === 4) {
      buildSummary();
    }
  }

  // ——————————————————————————————
  // Step 1: Foundation (single base — just continue)
  // ——————————————————————————————
  step1Next.addEventListener('click', function () {
    goToStep(2);
  });

  // ——————————————————————————————
  // Step 2: Lifestyle Fit
  // ——————————————————————————————
  lifestyleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var lifestyle = this.getAttribute('data-lifestyle');
      var idx = state.selectedLifestyles.indexOf(lifestyle);

      if (idx !== -1) {
        state.selectedLifestyles.splice(idx, 1);
        this.classList.remove('lifestyle-card--selected');
      } else {
        state.selectedLifestyles.push(lifestyle);
        this.classList.add('lifestyle-card--selected');
      }

      var hasSelection = state.selectedLifestyles.length > 0;
      step2Next.disabled = !hasSelection;

      if (hasSelection) {
        var plan = getPlanName();
        step2Hint.textContent = plan.label + ' — ' + plan.tagline;
        step2Hint.style.color = 'var(--color-accent)';
      } else {
        step2Hint.textContent = 'Select at least one lifestyle to continue';
        step2Hint.style.color = '';
      }
    });
  });

  step2Next.addEventListener('click', function () {
    if (state.selectedLifestyles.length > 0) {
      goToStep(3);
    }
  });

  step2Back.addEventListener('click', function () {
    goToStep(1);
  });

  // ——————————————————————————————
  // Step 3: Experience Enhancers
  // ——————————————————————————————
  enhancerCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var enhancer = this.getAttribute('data-enhancer');
      var idx = state.selectedEnhancers.indexOf(enhancer);

      if (idx !== -1) {
        state.selectedEnhancers.splice(idx, 1);
        this.classList.remove('enhancer-card--selected');
      } else {
        state.selectedEnhancers.push(enhancer);
        this.classList.add('enhancer-card--selected');
      }

      var hasSelection = state.selectedEnhancers.length > 0;
      step3Next.disabled = !hasSelection;

      if (hasSelection) {
        var count = state.selectedEnhancers.length;
        step3Hint.textContent =
          count + ' enhancer' + (count > 1 ? 's' : '') + ' selected';
        step3Hint.style.color = 'var(--color-accent)';
      } else {
        step3Hint.textContent = 'Select at least one enhancer to continue';
        step3Hint.style.color = '';
      }
    });
  });

  step3Next.addEventListener('click', function () {
    if (state.selectedEnhancers.length > 0) {
      goToStep(4);
    }
  });

  step3Back.addEventListener('click', function () {
    goToStep(2);
  });

  // ——————————————————————————————
  // Step 4: Summary & Checkout
  // ——————————————————————————————
  function buildSummary() {
    var plan = getPlanName();

    // Title — named plan
    summaryTitle.textContent = plan.label;

    // Narrative — problem-solving description
    summaryNarrative.textContent = generateNarrative();

    // Base info — shows the named plan
    summaryBase.innerHTML =
      '<span class="summary__base-icon">' +
      '<svg viewBox="0 0 32 32" fill="none" width="24" height="24" style="color: var(--color-accent);">' +
      '<path d="M4 22 Q10 8 16 16 Q22 24 28 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
      '<circle cx="28" cy="10" r="2.5" fill="currentColor" opacity="0.6"/>' +
      '</svg>' +
      '</span>' +
      '<div class="summary__base-info">' +
      '<h4>' + plan.label + '</h4>' +
      '<p>' + plan.tagline + '</p>' +
      '</div>';

    // Lifestyle tags
    summaryLifestyle.innerHTML = '';
    state.selectedLifestyles.forEach(function (ls) {
      var data = lifestyleData[ls];
      if (data) {
        var tag = document.createElement('span');
        tag.className = 'summary__tag';
        tag.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          data.name;
        summaryLifestyle.appendChild(tag);
      }
    });

    // Enhancer tags
    summaryEnhancers.innerHTML = '';
    state.selectedEnhancers.forEach(function (en) {
      var data = enhancerData[en];
      if (data) {
        var tag = document.createElement('span');
        tag.className = 'summary__tag';
        tag.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          data.name;
        summaryEnhancers.appendChild(tag);
      }
    });

    // Single consolidated price
    var total = calculateTotal();
    summaryPrice.innerHTML = '$' + total + '<span>/mo</span>';
  }

  step4Back.addEventListener('click', function () {
    goToStep(3);
  });

  // Show checkout form
  checkoutBtn.addEventListener('click', function () {
    checkoutForm.style.display = 'block';
    step4Actions.style.display = 'none';

    checkoutForm.style.opacity = '0';
    checkoutForm.style.transform = 'translateY(20px)';
    checkoutForm.style.transition = 'opacity 500ms ease, transform 500ms ease';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        checkoutForm.style.opacity = '1';
        checkoutForm.style.transform = 'translateY(0)';
      });
    });

    setTimeout(function () {
      checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });

  // Apple Pay buttons (placeholder — will be configured later)
  if (applePayBtn) {
    applePayBtn.addEventListener('click', function () {
      showConfirmation();
    });
  }

  if (applePayBtnCheckout) {
    applePayBtnCheckout.addEventListener('click', function () {
      showConfirmation();
    });
  }

  // Submit order
  submitOrder.addEventListener('click', function () {
    showConfirmation();
  });

  function showConfirmation() {
    summaryContainer.style.display = 'none';
    checkoutForm.style.display = 'none';
    step4Actions.style.display = 'none';

    var header = document.querySelector('#step4 .build-step__header');
    if (header) {
      header.style.display = 'none';
    }

    confirmationScreen.style.display = 'block';
    confirmationScreen.style.opacity = '0';
    confirmationScreen.style.transform = 'translateY(20px)';
    confirmationScreen.style.transition =
      'opacity 600ms ease, transform 600ms ease';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        confirmationScreen.style.opacity = '1';
        confirmationScreen.style.transform = 'translateY(0)';
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Log the personalization mapping (invisible backend logic)
    console.log('[OtterDrift] Experience profile mapped:', {
      planName: getPlanName().label,
      lifestyles: state.selectedLifestyles,
      enhancers: state.selectedEnhancers,
      plan: mapToBackendProfile(),
      price: calculateTotal(),
    });
  }

  // ——————————————————————————————
  // Backend Profile Mapping (invisible to user)
  // ——————————————————————————————
  function mapToBackendProfile() {
    var profile = {
      tier: 'standard',
      features: [],
      priority: 'normal',
    };

    // Lifestyle adjustments determine tier
    if (
      state.selectedLifestyles.indexOf('gaming') !== -1 ||
      (state.selectedLifestyles.indexOf('busy-household') !== -1 &&
        state.selectedLifestyles.indexOf('streaming') !== -1)
    ) {
      profile.tier = 'premium';
    } else if (
      state.selectedLifestyles.indexOf('busy-household') !== -1 ||
      state.selectedLifestyles.indexOf('streaming') !== -1
    ) {
      profile.tier = 'family';
    } else if (state.selectedLifestyles.indexOf('home-office') !== -1) {
      profile.tier = 'professional';
    } else if (state.selectedLifestyles.indexOf('smart-home') !== -1) {
      profile.tier = 'connected';
    }

    // Lifestyle feature flags
    if (
      state.selectedLifestyles.indexOf('busy-household') !== -1 ||
      state.selectedLifestyles.indexOf('streaming') !== -1
    ) {
      profile.features.push('multi-device-optimization');
    }
    if (state.selectedLifestyles.indexOf('home-office') !== -1) {
      profile.features.push('traffic-prioritization');
    }
    if (state.selectedLifestyles.indexOf('gaming') !== -1) {
      profile.features.push('low-latency-mode');
    }
    if (state.selectedLifestyles.indexOf('smart-home') !== -1) {
      profile.features.push('iot-management');
    }

    // Enhancer feature flags
    if (state.selectedEnhancers.indexOf('flow-management') !== -1) {
      profile.features.push('adaptive-qos');
    }
    if (state.selectedEnhancers.indexOf('digital-safety') !== -1) {
      profile.features.push('security-suite');
    }
    if (state.selectedEnhancers.indexOf('guest-access') !== -1) {
      profile.features.push('guest-network');
    }
    if (state.selectedEnhancers.indexOf('extended-reach') !== -1) {
      profile.features.push('mesh-outdoor-extension');
    }
    if (state.selectedEnhancers.indexOf('quiet-focus') !== -1) {
      profile.features.push('scheduled-profiles');
    }

    return profile;
  }

  // ——————————————————————————————
  // Initialize: show step 1 with animation
  // ——————————————————————————————
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var firstStep = document.getElementById('step1');
      if (firstStep) {
        firstStep.classList.add('build-step--visible');
      }
    });
  });

})();
