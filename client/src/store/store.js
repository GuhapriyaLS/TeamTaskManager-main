import Vuex from 'vuex'

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isLoggedIn: false
    },
    mutations: {
        setToken(state, token){
            state.token = token
            if(token){
                state.isLoggedIn = true
            }else{
                state.isLoggedIn = false
            }
        },
        setUser(state, user){
            state.user = user;
        },
    },
    actions: {
        setToken({commit}, token){
            commit('setToken', token);
        },
        setUser({commit}, user){
            commit('setUser', user);
        },
        loginUser({ commit }, user) {
            commit('setUser', user);
          },
    }
})