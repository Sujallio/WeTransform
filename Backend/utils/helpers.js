const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production', {
    expiresIn: '30d'
  });
};

// Mock AI Analysis - Rule-based logic for MVP
const generateMockAnalysis = (photoUpload = false) => {
  const faceShapes = ['round', 'oval', 'square', 'heart'];
  const skinTypes = ['oily', 'dry', 'normal', 'combination', 'sensitive'];
  const skinConditions = ['clear', 'acne-prone', 'dull', 'oily', 'dry-patches'];
  const skinTones = ['fair', 'light', 'medium', 'tan', 'deep'];

  if (!photoUpload) {
    return {
      faceShape: 'unknown',
      skinType: 'unknown',
      skinCondition: 'unknown',
      skinTone: 'unknown',
      insights: {
        hairstyleSuggestion: 'Generic style recommendations based on your profile will be provided after analysis',
        colorPalette: [],
        skincareNotes: 'Upload a photo for personalized skincare recommendations',
        fashionNotes: 'Upload a photo for personalized fashion guidance'
      }
    };
  }

  return {
    faceShape: faceShapes[Math.floor(Math.random() * faceShapes.length)],
    skinType: skinTypes[Math.floor(Math.random() * skinTypes.length)],
    skinCondition: skinConditions[Math.floor(Math.random() * skinConditions.length)],
    skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
    insights: {
      hairstyleSuggestion: 'Personalized based on your face shape and features',
      colorPalette: ['Warm earth tones', 'Cool pastels', 'Jewel tones'],
      skincareNotes: 'Comprehensive skincare routine tailored to your skin type',
      fashionNotes: 'Fashion recommendations based on your skin tone and style'
    }
  };
};

// Mock Guidance Generation
const generateMockGuidance = (areas, analysis) => {
  const guidance = {
    areas: [],
    dietChart: {
      foodsForSkinHealth: [
        'Berries (antioxidants)',
        'Leafy greens (vitamins)',
        'Nuts and seeds (omega-3)',
        'Whole grains (energy)',
        'Yogurt (probiotics)'
      ],
      foodsForEnergyGrowth: [
        'Eggs (proteins)',
        'Chicken and lean meat',
        'Legumes (fibers)',
        'Sweet potatoes (vitamins)',
        'Avocado (healthy fats)'
      ],
      hydrationTips: [
        'Drink 8-10 glasses of water daily',
        'Limit sugary beverages',
        'Have water before, during, and after exercise'
      ]
    },
    confidenceTips: {
      bodyPosture: [
        'Stand straight with shoulders back',
        'Keep your chin parallel to the ground',
        'Maintain 2-3 feet of personal space',
        'Practice power posing for 2 minutes before important moments'
      ],
      eyeContact: [
        'Make eye contact for 3-5 seconds',
        'Look at the other person\'s eyes during conversations',
        'Practice mirror talk to build confidence'
      ],
      conversationStarters: [
        'Ask open-ended questions about their interests',
        'Share something about yourself authentically',
        'Find common ground first',
        'Practice active listening'
      ],
      dailyExercises: [
        'Morning affirmation (1 minute)',
        'Gratitude journaling (2 minutes)',
        'Power walk (10 minutes)',
        'Evening reflection on wins (2 minutes)'
      ]
    }
  };

  // Helper function to get color palettes based on skin tone
  const getColorPaletteForSkinTone = (skinTone) => {
    const colorPalettes = {
      fair: {
        colors: ['Soft pastels', 'Jewel tones (emerald, sapphire)', 'Cool shades (blues, pinks)', 'Silver accents'],
        avoid: ['Warm oranges', 'Muddy browns'],
        recommendations: ['Pearl white', 'Rose gold', 'Lavender', 'Icy blue']
      },
      light: {
        colors: ['Earth tones', 'Pastel colors', 'Soft jewel tones', 'Gold accents'],
        avoid: ['Very dark colors'],
        recommendations: ['Cream', 'Soft gold', 'Peach', 'Light coral']
      },
      medium: {
        colors: ['Jewel tones', 'Earth tones', 'Bold colors', 'Any metallic'],
        avoid: ['Very pale colors'],
        recommendations: ['Emerald', 'Terracotta', 'Warm gold', 'Deep reds']
      },
      tan: {
        colors: ['Warm tones', 'Gold', 'Copper', 'Olive shades', 'Warm reds'],
        avoid: ['Cool grays', 'Silver'],
        recommendations: ['Warm bronze', 'Caramel', 'Golden yellow', 'Rust orange']
      },
      deep: {
        colors: ['Bright colors', 'Rich jewel tones', 'Warm metallics', 'Bold shades'],
        avoid: ['Pale colors', 'Muted tones'],
        recommendations: ['Gold', 'Scarlet red', 'Electric blue', 'Rich purple']
      }
    };
    return colorPalettes[skinTone] || colorPalettes.medium;
  };

  // Add area-specific guidance
  areas.forEach(area => {
    const areaGuidance = {
      areaType: area,
      routine: { morning: [], evening: [] },
      recommendations: [],
      productSuggestions: [],
      tips: []
    };

    if (area === 'skincare') {
      areaGuidance.routine.morning = [
        'Cleanse with lukewarm water',
        'Apply toner',
        'Apply moisturizer appropriate for your skin type',
        'Apply SPF 30+ sunscreen'
      ];
      areaGuidance.routine.evening = [
        'Cleanse with mild face wash',
        'Apply toner',
        'Apply night serum or moisturizer',
        'Sleep well for cell repair'
      ];
      areaGuidance.productSuggestions = [
        'Sunscreen SPF 30+ (daily protection)',
        'Gentle cleanser for your skin type',
        'Moisturizer suited to your skin type',
        'Face mask (once weekly)'
      ];
      areaGuidance.tips = [
        'Never skip sunscreen',
        'Change pillowcase twice a week',
        'Avoid touching your face throughout the day',
        'Sleep 8+ hours for skin recovery'
      ];
    }

    if (area === 'haircut') {
      areaGuidance.recommendations = [
        'Get a haircut every 6-8 weeks',
        'Use heat protectant spray if using styling tools',
        'Oil your scalp once a week',
        'Trim split ends regularly'
      ];
      areaGuidance.productSuggestions = [
        'Shampoo suited to your hair type',
        'Conditioner for hydration',
        'Hair oil or serum for shine',
        'Heat protectant spray'
      ];
      areaGuidance.tips = [
        'Wash hair 2-3 times per week',
        'Use cold water rinse at the end',
        'Dry hair naturally when possible',
        'Avoid tight hairstyles that cause breakage'
      ];
    }

    if (area === 'fashion') {
      // Enhanced recommendations based on analysis
      if (analysis && analysis.skinTone && analysis.skinTone !== 'unknown') {
        const colorPalette = getColorPaletteForSkinTone(analysis.skinTone);
        
        areaGuidance.recommendations = [
          `Your skin tone (${analysis.skinTone}) looks best in: ${colorPalette.colors.join(', ')}`,
          `Colors to avoid: ${colorPalette.avoid.join(', ')}`,
          'Fit matters more than brand - prioritize comfort and confidence',
          'Build a capsule wardrobe with basics in your best colors',
          `Face shape (${analysis.faceShape}) tip: Choose styles that complement your features`,
          'Accessorize to express personality and elevate simple outfits'
        ];
        areaGuidance.tips = [
          `Best colors for you: ${colorPalette.recommendations.join(', ')}`,
          'Wear clothes that make you feel confident',
          'Mix and match pieces for variety',
          'Keep your wardrobe clean and organized',
          'Invest in quality basics',
          `${analysis.skinTone} skin tones often look stunning with metallics like ${analysis.skinTone === 'deep' ? 'gold' : analysis.skinTone === 'tan' ? 'warm bronze' : 'rose gold'}`
        ];
      } else {
        // Generic recommendations when no analysis
        areaGuidance.recommendations = [
          'Upload a photo to get personalized color recommendations based on your skin tone!',
          'Fit matters more than brand',
          'Build a capsule wardrobe with basics',
          'Accessorize to express personality'
        ];
        areaGuidance.tips = [
          'Wear clothes that make you feel confident',
          'Mix and match pieces for variety',
          'Keep your wardrobe clean and organized',
          'Invest in quality basics'
        ];
      }
      
      areaGuidance.productSuggestions = [
        'Basic t-shirts in neutral and accent colors',
        'Well-fitting jeans or trousers',
        'Comfortable everyday shoes',
        'Simple jewelry pieces'
      ];
    }

    if (area === 'diet') {
      areaGuidance.recommendations = [
        'Eat breakfast within 1 hour of waking',
        'Include protein in each meal',
        'Eat 5 portions of fruits and vegetables daily',
        'Limit processed and sugary foods'
      ];
      areaGuidance.tips = [
        'Plan your meals a week in advance',
        'Carry a water bottle',
        'Eat mindfully without distractions',
        'Don\'t skip meals; maintain regular eating times'
      ];
    }

    if (area === 'body-confidence') {
      areaGuidance.recommendations = [
        'Focus on what your body can do, not how it looks',
        'Practice regular physical activity you enjoy',
        'Wear clothes that fit well',
        'Celebrate your unique features'
      ];
      areaGuidance.tips = [
        'Exercise for energy and strength, not punishment',
        'Avoid comparing yourself to others',
        'Practice positive self-talk',
        'Surround yourself with supportive people'
      ];
    }

    if (area === 'communication') {
      areaGuidance.recommendations = [
        'Listen actively before responding',
        'Express your feelings clearly and respectfully',
        'Ask for clarification when confused',
        'Respect others\' boundaries'
      ];
      areaGuidance.tips = [
        'Speak with confidence in your voice',
        'Choose words that are kind to others',
        'Practice saying "no" respectfully',
        'Build genuine connections, not popularity'
      ];
    }

    guidance.areas.push(areaGuidance);
  });

  return guidance;
};

module.exports = {
  generateToken,
  generateMockAnalysis,
  generateMockGuidance
};
