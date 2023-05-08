import React from "react";


function SignUp() {
  function submitForm(event: React.FormEvent) {
    event.preventDefault();
  }
  return (
    <form
      className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
      onSubmit={(e) => submitForm(e)}
    >
      <input
        className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="text"
        placeholder="Nome completo"
        name="name"
      />
      <br />
      <input
        className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="email"
        placeholder="E-mail"
        name="email"
      />
      <br />
      <input
        className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="password"
        placeholder="Senha"
        name="password"
      />
      <br />
      <input
        className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="number"
        placeholder="Número de telefone"
        name="password"
      />
      <br />
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}

export default SignUp;
