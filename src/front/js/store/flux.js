const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		user: null,
		token: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		syncToken: () => {
		  const token = sessionStorage.getItem("token");
		  console.log("sincronizando token Storage");
		  if (token && token != "" && token != undefined)
			setStore({ token: token });
		},
  
		logout: () => {
		  sessionStorage.removeItem("token");
		  console.log("Sesion terminada");
		  setStore({ token: null });
		  localStorage.removeItem("user");
		},
  
		login: async (email, password) => {
		  const opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  };
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/token",
			  opts
			);
			if (resp.ok) {
			  const data = await resp.json();
			  sessionStorage.setItem("token", data.access_token);
			  setStore({
				token: data.access_token,
				user: data.user,
			  });
			  alert("iniciado con exito");
			  return true;
			}
			alert("Ocurrio un error");
			return false;
		  } catch (error) {
			console.log("Ocurrio un error en el login");
		  }
		},
  
		registro: async (data) => {
		  const opt = {
			method: "POST",
			body: JSON.stringify({
			  email: data.email,
			  password: data.password,
			  is_active: data.checked,
			}),
			headers: {
			  "Content-Type": "application/json",
			},
		  };
  
		  const baseurl = process.env.BACKEND_URL + "/api/registro";
  
		  try {
			const resp = await fetch(baseurl, opt);
			if (resp.status !== 200) {
			  alert("No se pudo registrar los datos");
			  return false;
			}
			const data = await resp.json();
  
			alert("los datos se guardaron con exito");
  
			return true;
		  } catch (error) {
			console.log("Hubo un error al ingresar al login");
		  }
		},
  
		getMessage: async () => {
		  try {
			
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		changeColor: (index, color) => {
		  
		  const store = getStore();
  
		  
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;