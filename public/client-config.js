(function () {
  const defaultClientSlug = "bnyc-qingdao";

  const clients = {
    "bnyc-qingdao": {
      slug: "bnyc-qingdao",
      submissionPrefix: "BNYC",
      routes: {
        entryPath: "/",
        successPath: "/success.html"
      },
      brand: {
        name: "Sing-China",
        subtitle: "BNYC Qingdao Trip",
        logoSrc: "/clients/bnyc-qingdao/logo.png",
        logoAlt: "Sing-China logo"
      },
      programme: {
        pageTitle: "BNYC Qingdao Trip | Register",
        eyebrow: "BNYC Qingdao Trip",
        name: "BNYC Qingdao Trip",
        priceDisplay: "SGD 1,600.00",
        amountValue: 1600,
        summary: "5-Day China Immersion Programme",
        posterSrc: "/clients/bnyc-qingdao/poster.png",
        posterAlt: "BNYC Qingdao Trip programme poster",
        datesLabel: "Programme Dates",
        datesValue: "20-24 September 2026",
        includesLabel: "The programme includes",
        includesItems: [
          "Executive learning sessions",
          "Company and institutional visits",
          "Local programme transportation"
        ],
        itineraryTitle: "Simple Itinerary",
        itineraryItems: [
          {
            title: "Day 1 - Discover Qingdao",
            description: "Arrival & Qingdao Old Town City Walk"
          },
          {
            title: "Day 2 - Management & Entrepreneurship",
            description: "Opening Ceremony · Business Lecture · Haier Group · BNYC Business Exchange"
          },
          {
            title: "Day 3 - Innovation & Global Brands",
            description: "Hisense Group · Tsingtao Brewery"
          },
          {
            title: "Day 4 - Culture & Connection",
            description: "Laoshan Cultural Experience · Closing Ceremony"
          },
          {
            title: "Day 5 - Departure",
            description: ""
          }
        ]
      },
      payment: {
        title: "Payment",
        description: "Please complete your payment by PayNow or bank transfer, then upload your payment proof.",
        referenceNote: "Please enter your full name in the payment reference.",
        qrSrc: "/clients/bnyc-qingdao/paynow-qr.png",
        qrAlt: "Sing-China PayNow QR Code",
        payeeName: "Sing-China",
        amountDisplay: "SGD 1,600.00",
        uenLabel: "UEN",
        uenValue: "200813020Z",
        bankTransfer: {
          title: "Bank Transfer",
          intro: "You may also pay by bank transfer using the details below.",
          accountHolderLabel: "Name of Account Holder",
          accountHolderValue: "SINGAPORE SING-CHINA INTERNATIONAL TRAINING GROUP PTE LTD",
          bankNameLabel: "Bank Name",
          bankNameValue: "United Overseas Bank Ltd",
          accountNumberLabel: "Bank Account No",
          accountNumberValue: "339-303-342-6",
          swiftCodeLabel: "SWIFT Code",
          swiftCodeValue: "UOVBSGSGXXX"
        }
      },
      registration: {
        eyebrow: "Register & Pay",
        title: "Participant Registration Form",
        intro: "Complete the form below and upload your payment proof.",
        invoiceTitle: "Do you require an invoice?",
        invoiceHelp:
          "If yes, the invoice will be sent to your registered email address within 5 working days after payment verification.",
        invoiceNameLabel: "Please state the information on the invoice",
        invoiceNamePlaceholder: "",
        consentText:
          "I confirm that the information provided is accurate and I consent to Sing-China using it for registration, payment verification, and programme administration.",
        submitButtonLabel: "Register",
        detailNote:
          "After payment verification, participants will receive a confirmation email. If invoice is requested, it will be sent to the registered email address within 5 working days."
      },
      success: {
        pageTitle: "BNYC Qingdao Trip | Registration Submitted",
        eyebrow: "Registration Submitted",
        headlineLines: ["Thank you.", "See You In Qingdao."],
        intro:
          "Your registration and payment proof have been received successfully. Our team will review your submission and verify your PayNow payment shortly.",
        badges: ["5-Day China Immersion Programme", "20-24 September 2026", "PayNow Payment Received"],
        paymentStatus: "Pending Verification",
        nextStepsTitle: "What Happens Next",
        nextStepsItems: [
          "Our team verifies your PayNow payment and payment proof.",
          "A registration receipt email will be sent to your registered email address.",
          "If an invoice was requested, it will be sent within 5 working days after payment verification."
        ],
        discoverEyebrow: "Discover Qingdao",
        discoverTitle: "What You May Experience In Qingdao",
        discoverIntro:
          "From its coastal skyline to its business landscape, Qingdao offers a distinctive blend of innovation, culture, and global industry.",
        discoverItems: [
          {
            title: "Seaside Skyline",
            description:
              "Enjoy modern waterfront views, open sea air, and one of China’s most recognisable coastal cityscapes."
          },
          {
            title: "Historic Character",
            description:
              "Explore old-town streets, red-roof architecture, and the European-influenced charm of Qingdao."
          },
          {
            title: "Innovation & Industry",
            description:
              "See how advanced manufacturing, entrepreneurship, and major Chinese brands connect in real business settings."
          }
        ]
      }
    },
    "business-china-ylp-shenzhen": {
      slug: "business-china-ylp-shenzhen",
      submissionPrefix: "YLP",
      routes: {
        entryPath: "/bc-shenzhen.html",
        successPath: "/bc-shenzhen-success.html"
      },
      brand: {
        name: "Business China",
        subtitle: "YLP Immersion Programme - Shenzhen",
        logoSrc: "/clients/business-china-ylp-shenzhen/business-china-logo.png",
        logoAlt: "Business China logo"
      },
      programme: {
        pageTitle: "Business China YLP Immersion Programme - Shenzhen | Register",
        eyebrow: "Youth Leader Program 2026",
        name: "Business China YLP Immersion Programme - Shenzhen",
        priceDisplay: "SGD 2,650.00",
        amountValue: 2650,
        summary: "7-Day Executive Learning Journey",
        posterSrc: "/clients/business-china-ylp-shenzhen/poster.png",
        posterAlt: "Business China Youth Leader Program 2026 poster",
        datesLabel: "Programme Duration",
        datesValue: "Seven-Day Journey",
        includesLabel: "Who Should Attend?",
        includesItems: [
          "Young entrepreneurs and next-generation business leaders",
          "Corporate executives and management professionals",
          "Leaders responsible for innovation, strategy or digital transformation",
          "Professionals seeking business opportunities in China and the Greater Bay Area",
          "Participants interested in AI, robotics, healthcare technology and smart manufacturing"
        ],
        itineraryTitle: "Seven-Day Journey",
        itineraryItems: [
          {
            title: "Day 1 - Arrival in Shenzhen",
            description: "Airport pickup, hotel check-in and program orientation."
          },
          {
            title: "Day 2 - Greater Bay Area and Tencent",
            description: "Opening ceremony, Greater Bay Area lecture, Tencent visit and welcome dinner."
          },
          {
            title: "Day 3 - Shenzhen Innovation Ecosystem",
            description: "Mobile classroom and innovation management lecture featuring the DJI case."
          },
          {
            title: "Day 4 - AI in Education, Government and Healthcare",
            description: "Visits to iFLYTEK and Huaqing Zhimei."
          },
          {
            title: "Day 5 - AI Entrepreneurship and Large Models",
            description: "Visit to Moli Valley OPC and lecture on large model development and applications."
          },
          {
            title: "Day 6 - Embodied Intelligence and Robotics",
            description: "Visit to Leju Robotics, program assessment, closing ceremony and farewell dinner."
          },
          {
            title: "Day 7 - Departure",
            description: "Hotel check-out and delegation departure."
          }
        ]
      },
      payment: {
        title: "Payment",
        description: "Please scan the PayNow QR code and upload your payment proof after payment.",
        referenceNote: "Please enter your full name in the payment reference.",
        qrSrc: "/clients/business-china-ylp-shenzhen/YLP paynow.png",
        qrAlt: "Business China YLP PayNow QR Code",
        payeeName: "Sing-China",
        amountDisplay: "SGD 2,650.00",
        uenLabel: "",
        uenValue: ""
      },
      registration: {
        eyebrow: "Register & Pay",
        title: "Participant Registration Form",
        intro: "Complete the form below and upload your payment proof.",
        invoiceTitle: "Do you require an invoice?",
        invoiceHelp:
          "If yes, the invoice will be sent to your registered email address within 5 working days after payment verification.",
        invoiceNameLabel: "Please state the information on the invoice",
        invoiceNamePlaceholder: "",
        consentText:
          "I confirm that the information provided is accurate and I consent to Business China and Sing-China using it for registration, payment verification, and programme administration.",
        submitButtonLabel: "Register",
        detailNote:
          "The Youth Leader Program 2026 is a seven-day executive learning journey in Shenzhen for emerging business leaders seeking deeper insight into China’s innovation economy, artificial intelligence ecosystem and technology-driven industrial transformation."
      },
      success: {
        pageTitle: "Business China YLP Immersion Programme - Shenzhen | Registration Submitted",
        eyebrow: "Registration Submitted",
        headlineLines: ["Thank you.", "See You In Shenzhen."],
        intro:
          "Your registration and payment proof have been received successfully. Our team will review your submission and verify your PayNow payment shortly.",
        badges: ["7-Day Executive Learning Journey", "Shenzhen Innovation Hub", "PayNow Payment Received"],
        paymentStatus: "Pending Verification",
        nextStepsTitle: "What Happens Next",
        nextStepsItems: [
          "Our team verifies your PayNow payment and payment proof.",
          "A registration receipt email will be sent to your registered email address.",
          "If an invoice was requested, it will be sent within 5 working days after payment verification."
        ],
        discoverEyebrow: "Discover Shenzhen",
        discoverTitle: "What You May Experience In Shenzhen",
        discoverIntro:
          "Shenzhen brings together frontier technology, entrepreneurial energy and fast-moving industrial transformation in one of China’s most dynamic innovation ecosystems.",
        discoverItems: [
          {
            title: "AI & Digital Platforms",
            description:
              "Learn how artificial intelligence is being applied across digital platforms, public services and enterprise operations."
          },
          {
            title: "Innovation Ecosystem",
            description:
              "Understand how Shenzhen connects startups, global technology firms, investors and advanced manufacturing."
          },
          {
            title: "Robotics & Smart Industry",
            description:
              "Explore real-world applications in robotics, healthcare technology, entrepreneurship and smart manufacturing."
          }
        ]
      }
    }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getRequestedClientSlug() {
    if (window.FORCED_CLIENT_SLUG) {
      return window.FORCED_CLIENT_SLUG;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("client") || defaultClientSlug;
  }

  function getClientConfig(slug) {
    return clone(clients[slug] || clients[defaultClientSlug]);
  }

  window.CLIENT_CATALOG = clients;
  window.DEFAULT_CLIENT_SLUG = defaultClientSlug;
  window.getClientConfig = getClientConfig;
  window.ACTIVE_CLIENT_CONFIG = getClientConfig(getRequestedClientSlug());
})();
