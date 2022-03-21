const { currentSession } = JSON.parse(localStorage.getItem('supabase.auth.token')) || [];

const INITIAL_STATE = {
  user: { email: '' },
  mealsToken: 1,
  cocktailsToken: 1,
  responseFoodAndDrinks: [{}],
  doneRecipes: currentSession?.user.user_metadata.doneRecipes || [],
  favoriteRecipes: currentSession?.user.user_metadata.favoriteRecipes || [],
  inProgressRecipes: currentSession?.user.user_metadata.inProgressRecipes
  || { meals: {}, cocktails: {} },
  mealsCategoryResponse: [],
  drinksCategoryResponse: [],
  isClickedInExplore: false,
};

export default INITIAL_STATE;
