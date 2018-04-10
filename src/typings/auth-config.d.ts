export default interface AuthConfig {
  routes: {
    login: string,
    logout: string,
    auth: string,
    register: string
  },
  methods: {
    login: string,
    logout: string,
    auth: string,
    register: string,
  },
  modelPrefix: boolean
}