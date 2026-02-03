/**
 * OtterDrift — Build Your Drift Experience
 * Multi-step buyer flow with personalization logic
 */

(function () {
  'use strict';

  // ——————————————————————————————
  // State
  // ——————————————————————————————
  var state = {
    currentStep: 1,
    selectedBase: null,
    basePrice: 0,
    selectedLifestyles: [],
    selectedEnhancers: [],
    enhancerPrices: {},
  };

  // ——————————————————————————————
  // Data: Experience descriptions and narratives
  // ——————————————————————————————
  var baseData = {
    explorer: {
      name: 'Explorer Base',
      icon: '🌊',
      tagline: 'Everyday digital flow',
      summaryTitle: 'Explorer Experience',
    },
    creator: {
      name: 'Creator Base',
      icon: '✦',
      tagline: 'Work, sharing, and focus',
      summaryTitle: 'Creator Experience',
    },
    gather: {
      name: 'Gather Base',
      icon: '🏡',
      tagline: 'Whole-home harmony',
      summaryTitle: 'Gather Experience',
    },
    zen: {
      name: 'Zen Base',
      icon: '🍃',
      tagline: 'Complete peace of mind',
      summaryTitle: 'Zen Experience',
    },
  };

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
    'priority-support': { name: 'Priority human support', icon: '💬' },
    'quiet-focus': { name: 'Quiet & focus modes', icon: '🌙' },
  };

  // Narrative generation based on selections
  function generateNarrative() {
    var base = state.selectedBase;
    var lifestyles = state.selectedLifestyles;
    var enhancers = state.selectedEnhancers;

    var narratives = {
      explorer: {
        default:
          'Your OtterDrift experience is designed for effortless daily connection. Browse, stream, and stay connected with a flow that keeps pace with your curiosity — calm, simple, and always ready.',
        'busy-household':
          'Your OtterDrift experience flows seamlessly across your busy household. Everyone stays connected in their own rhythm while the experience keeps everything in harmony.',
        'home-office':
          'Your OtterDrift experience brings clarity to your work-from-home life. A calm, reliable connection that lets you focus on what matters without thinking about what\'s behind it.',
        streaming:
          'Your OtterDrift experience is built for uninterrupted enjoyment. Settle in, press play, and let every story unfold exactly as it should — smooth and immersive.',
        gaming:
          'Your OtterDrift experience keeps you immersed in the worlds you love. Responsive, fluid, and designed to keep up with every moment of play.',
        'smart-home':
          'Your OtterDrift experience connects your smart home with effortless grace. Every device, every automation, flowing together as one.',
      },
      creator: {
        default:
          'Your OtterDrift Creator experience is shaped around focus and flow. Collaborate, create, and share without friction — your digital workspace, redefined with calm clarity.',
        'busy-household':
          'Even in a busy household, your Creator experience carves out the space you need. Focused flow when you need it, shared harmony when you don\'t.',
        'home-office':
          'Your Creator experience transforms your home office into a professional sanctuary. Uninterrupted calls, seamless collaboration, and a connection as reliable as your ambition.',
        streaming:
          'Create and unwind in equal measure. Your Creator experience balances professional flow with personal enjoyment — effortlessly switching between work and play.',
        gaming:
          'From creative work to immersive play, your Creator experience adapts to every mode. Deep focus for your projects, fluid responsiveness for your downtime.',
        'smart-home':
          'Your Creator experience weaves your smart home and professional life into one seamless tapestry. Focus when you work, automation when you rest.',
      },
      gather: {
        default:
          'Your OtterDrift Gather experience is built for the whole household. Everyone stays connected, nobody compromises, and every moment — from movie night to homework — flows without friction.',
        'busy-household':
          'Your Gather experience thrives in the beautiful chaos of a busy home. Every person, every device, every moment gets the attention it deserves — simultaneously and seamlessly.',
        'home-office':
          'Balancing work and family under one roof? Your Gather experience gives your office dedicated focus while keeping the rest of the household flowing in perfect harmony.',
        streaming:
          'Your Gather experience turns every screen into a stage. Stream in every room, on every device — simultaneously — while the household hums along without missing a beat.',
        gaming:
          'Game, stream, and connect all at once. Your Gather experience ensures everyone in the house gets their moment — competitive play, casual browsing, and everything in between.',
        'smart-home':
          'Your Gather experience turns a connected home into an intelligent one. Every smart device, every family member, every moment — flowing together in effortless harmony.',
      },
      zen: {
        default:
          'Your OtterDrift Zen experience is the pinnacle of digital serenity. Every connection is protected, every moment is balanced, and your home feels as peaceful as the experience itself.',
        'busy-household':
          'Even the busiest household deserves peace. Your Zen experience brings order to the digital chaos — protecting every device, balancing every need, and keeping your home in perfect equilibrium.',
        'home-office':
          'Your Zen experience wraps your professional and personal life in a layer of calm. Protected, balanced, and serene — so you can focus on what truly matters.',
        streaming:
          'Immerse yourself in stories without a care. Your Zen experience protects every stream, balances every connection, and lets you enjoy entertainment in total peace.',
        gaming:
          'Play without worry. Your Zen experience shields your immersive moments while maintaining the balance and protection your entire household deserves.',
        'smart-home':
          'Your Zen experience is the ultimate smart home companion. Every device protected, every connection intelligent, every automation running in serene harmony.',
      },
    };

    if (!base || !narratives[base]) {
      return 'Your curated OtterDrift experience is being shaped around your unique lifestyle.';
    }

    // Use the first selected lifestyle for narrative, or default
    var primaryLifestyle = lifestyles.length > 0 ? lifestyles[0] : 'default';
    var baseNarratives = narratives[base];

    var narrative = baseNarratives[primaryLifestyle] || baseNarratives['default'];

    // Add enhancer flavor text
    if (enhancers.length > 0) {
      var enhancerFlavors = [];
      if (enhancers.indexOf('flow-management') !== -1) {
        enhancerFlavors.push('intelligent adaptation');
      }
      if (enhancers.indexOf('digital-safety') !== -1) {
        enhancerFlavors.push('comprehensive protection');
      }
      if (enhancers.indexOf('guest-access') !== -1) {
        enhancerFlavors.push('welcoming guest access');
      }
      if (enhancers.indexOf('priority-support') !== -1) {
        enhancerFlavors.push('dedicated human support');
      }
      if (enhancers.indexOf('quiet-focus') !== -1) {
        enhancerFlavors.push('mindful focus scheduling');
      }

      if (enhancerFlavors.length > 0) {
        narrative += ' Enhanced with ' + formatList(enhancerFlavors) + '.';
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
  // DOM References
  // ——————————————————————————————
  var steps = document.querySelectorAll('.build-step');
  var progressSteps = document.querySelectorAll('.build-nav__step');

  // Step 1
  var baseCards = document.querySelectorAll('.base-card');
  var step1Next = document.getElementById('step1Next');
  var step1Hint = document.getElementById('step1Hint');

  // Step 2
  var lifestyleCards = document.querySelectorAll('.lifestyle-card');
  var step2Next = document.getElementById('step2Next');
  var step2Back = document.getElementById('step2Back');
  var step2Hint = document.getElementById('step2Hint');

  // Step 3
  var enhancerCards = document.querySelectorAll('.enhancer-card');
  var step3Next = document.getElementById('step3Next');
  var step3Back = document.getElementById('step3Back');
  var step3Hint = document.getElementById('step3Hint');

  // Step 4
  var step4Back = document.getElementById('step4Back');
  var checkoutBtn = document.getElementById('checkoutBtn');
  var checkoutForm = document.getElementById('checkoutForm');
  var summaryContainer = document.getElementById('summaryContainer');
  var step4Actions = document.getElementById('step4Actions');
  var submitOrder = document.getElementById('submitOrder');
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
        // Trigger animation after a brief delay
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
  // Step 1: Base Selection
  // ——————————————————————————————
  baseCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var baseName = this.getAttribute('data-base');
      var price = parseInt(this.getAttribute('data-price'));

      // Deselect all
      baseCards.forEach(function (c) {
        c.classList.remove('base-card--selected');
      });

      // Select this one
      this.classList.add('base-card--selected');
      state.selectedBase = baseName;
      state.basePrice = price;

      // Enable continue
      step1Next.disabled = false;
      step1Hint.textContent = baseData[baseName].name + ' selected';
      step1Hint.style.color = 'var(--color-accent)';
    });
  });

  step1Next.addEventListener('click', function () {
    if (state.selectedBase) {
      goToStep(2);
    }
  });

  // ——————————————————————————————
  // Step 2: Lifestyle Fit
  // ——————————————————————————————
  lifestyleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var lifestyle = this.getAttribute('data-lifestyle');
      var idx = state.selectedLifestyles.indexOf(lifestyle);

      if (idx !== -1) {
        // Deselect
        state.selectedLifestyles.splice(idx, 1);
        this.classList.remove('lifestyle-card--selected');
      } else {
        // Select
        state.selectedLifestyles.push(lifestyle);
        this.classList.add('lifestyle-card--selected');
      }

      // Update button state
      var hasSelection = state.selectedLifestyles.length > 0;
      step2Next.disabled = !hasSelection;

      if (hasSelection) {
        var count = state.selectedLifestyles.length;
        step2Hint.textContent =
          count + ' lifestyle' + (count > 1 ? 's' : '') + ' selected';
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
      var price = parseInt(this.getAttribute('data-enhancer-price'));
      var idx = state.selectedEnhancers.indexOf(enhancer);

      if (idx !== -1) {
        // Deselect
        state.selectedEnhancers.splice(idx, 1);
        delete state.enhancerPrices[enhancer];
        this.classList.remove('enhancer-card--selected');
      } else {
        // Select
        state.selectedEnhancers.push(enhancer);
        state.enhancerPrices[enhancer] = price;
        this.classList.add('enhancer-card--selected');
      }

      // Update button state
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
    var base = baseData[state.selectedBase];
    if (!base) return;

    // Title
    summaryTitle.textContent = 'Your ' + base.summaryTitle;

    // Narrative
    summaryNarrative.textContent = generateNarrative();

    // Base info
    summaryBase.innerHTML =
      '<span class="summary__base-icon">' +
      base.icon +
      '</span>' +
      '<div class="summary__base-info">' +
      '<h4>' +
      base.name +
      '</h4>' +
      '<p>' +
      base.tagline +
      '</p>' +
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

    // Price calculation
    var total = state.basePrice;
    Object.keys(state.enhancerPrices).forEach(function (key) {
      total += state.enhancerPrices[key];
    });

    summaryPrice.innerHTML = '$' + total + '<span>/mo</span>';
  }

  step4Back.addEventListener('click', function () {
    goToStep(3);
  });

  // Checkout flow
  checkoutBtn.addEventListener('click', function () {
    // Show checkout form, hide summary actions
    checkoutForm.style.display = 'block';
    step4Actions.style.display = 'none';

    // Animate in
    checkoutForm.style.opacity = '0';
    checkoutForm.style.transform = 'translateY(20px)';
    checkoutForm.style.transition = 'opacity 500ms ease, transform 500ms ease';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        checkoutForm.style.opacity = '1';
        checkoutForm.style.transform = 'translateY(0)';
      });
    });

    // Scroll to form
    setTimeout(function () {
      checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });

  // Submit order
  submitOrder.addEventListener('click', function () {
    // Hide everything and show confirmation
    summaryContainer.style.display = 'none';
    checkoutForm.style.display = 'none';
    step4Actions.style.display = 'none';

    // Update header
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
      base: state.selectedBase,
      lifestyles: state.selectedLifestyles,
      enhancers: state.selectedEnhancers,
      plan: mapToBackendProfile(),
    });
  });

  // ——————————————————————————————
  // Backend Profile Mapping (invisible to user)
  // ——————————————————————————————
  function mapToBackendProfile() {
    // This logic maps user experience choices to pre-built operational plans
    // The user never sees this mapping
    var profile = {
      tier: 'standard',
      features: [],
      priority: 'normal',
    };

    // Base tier mapping
    switch (state.selectedBase) {
      case 'explorer':
        profile.tier = 'essential';
        break;
      case 'creator':
        profile.tier = 'professional';
        break;
      case 'gather':
        profile.tier = 'family';
        break;
      case 'zen':
        profile.tier = 'premium';
        break;
    }

    // Lifestyle adjustments
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
    if (state.selectedEnhancers.indexOf('priority-support') !== -1) {
      profile.priority = 'premium';
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
