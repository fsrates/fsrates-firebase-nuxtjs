export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error && error.response.status, 0);
    if (code === "301") return redirect("/");
  });
}
