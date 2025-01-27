import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  return (
    <header
      className={`bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-opacity-90`}
    >
      <div className="container mx-auto px-4 h-16">
        <div
          className={`flex items-center justify-between h-full ${
            theme == "black" ? "text-white" : "text-primary"
          } || ${theme == "wireframe" ? "text-zinc-800" : "text-primary"}`}
        >
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold">Let&apos;s Chat</h1>
            </Link>
          </div>

          <nav className={`flex items-center gap-2`}>
            <Link
              to={"/settings"}
              className={`
              btn gap-2 transition-colors `}
            >
              <Settings
                className={`w-4 h-4 ${
                  theme == "black" ? "text-white" : "text-primary"
                } || ${
                  theme == "wireframe" ? "text-zinc-800" : "text-primary"
                }`}
              />
              <span
                className={`hidden sm:inline font-normal text-primary ${
                  theme == "black" ? "text-white" : "text-primary"
                } || ${
                  theme == "wireframe" ? "text-zinc-800" : "text-primary"
                }`}
              >
                Settings
              </span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn gap-2`}>
                  <div className="">
                    <img
                      src={authUser?.profilePic}
                      className="rounded-full size-8 object-cover"
                    />
                  </div>
                  <span
                    className={`hidden sm:inline font-normal text-primary capitalize ${
                      theme == "black" ? "text-white" : "text-primary"
                    } || ${
                      theme == "wireframe" ? "text-zinc-800" : "text-primary"
                    }`}
                  >
                    {authUser?.fullName}
                  </span>
                </Link>

                <button
                  className="flex gap-2 items-center cursor-pointer btn"
                  onClick={logout}
                >
                  <LogOut
                    className={`size-5 ${
                      theme == "black" ? "text-white" : "text-primary"
                    } || ${
                      theme == "wireframe" ? "text-zinc-800" : "text-primary"
                    }`}
                  />
                  <span
                    className={`hidden sm:inline font-normal ${
                      theme == "black" ? "text-white" : "text-primary"
                    } || ${
                      theme == "wireframe" ? "text-zinc-800" : "text-primary"
                    }`}
                  >
                    Logout
                  </span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
