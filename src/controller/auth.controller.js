import supabase from "../supabase.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  register,
  login,
};
