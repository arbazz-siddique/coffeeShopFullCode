// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  Edit3,
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  
  Package2,
  PanelLeft,
  PencilRuler,
  ShoppingCart,
  Star,
  
  Utensils,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Dashboard from "./sub-components/Dashboard"
import ManageMenu from "./ManageMenu";
import ManageOrder from "./ManageOrder";
import Reservation from "./Reservation";
import Review from "./Review";
import UpdateMenuItem from './UpdateMenuItem';
import UpdateOrder from './UpdateOrder';
import UpdateReservation from './UpdateReservation';

const HomePage = () => {
  const [active, setActive] = useState("");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "ManageMenu"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("ManageMenu")}
                >
                  <Utensils className="h-5 w-5" />
                  <span className="sr-only">Manage Menu</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Menu</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "ManageOrder"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("ManageOrder")}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Manage Order</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Order</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Reservation"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Reservation")}
                >
                  <CalendarCheck className="h-5 w-5" />
                  <span className="sr-only">Reservation</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Reservation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Review"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Review")}
                >
                  <Star className="h-5 w-5" />
                  <span className="sr-only">Review</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Review</TooltipContent>
            </Tooltip>
          </TooltipProvider>

                {/* for updating the menu */}
                <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "UpdateMenuItem"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("UpdateMenuItem")}
                >
                  <Utensils className="h-5 w-5" />
                  <span className="sr-only">Update Menu Item</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Update Menu Item</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* for Updating the order */}
                
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "UpdateOrder"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("UpdateOrder")}
                >
                  <Edit3 className="h-5 w-5" />
                  <span className="sr-only">Update Order Item</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Update Order Item</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/*for  UpdateReservation */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "UpdateReservation"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("UpdateReservation")}
                >
                  <CalendarClock   className="h-5 w-5" />
                  <span className="sr-only">Update Reservation</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Update Reservation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Dashboard"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
             
                className={`flex items-center gap-4 px-2.5 ${
                  active === "ManageMenu"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("ManageMenu")}
              >
                <FolderGit className="h-5 w-5" />
                Manage Menu
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "ManageOrder"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("ManageOrder")}
              >
                <PencilRuler className="h-5 w-5" />
                Manage Order
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Reservation"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Reservation")}
              >
                <LayoutGrid className="h-5 w-5" />
                Reservation
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Review"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Review")}
              >
                <History className="h-5 w-5" />
                Review
              </Link>
             
             {/* for updating the menu */}
              
             <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "UpdateMenuItem"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("UpdateMenuItem")}
              >
                <Utensils className="h-5 w-5" />
                Update Menu Item
              </Link>

              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "UpdateOrder"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("UpdateOrder")}
              >
                <Edit3 className="h-5 w-5" />
                Update Order
              </Link>

              {/* UpdateReservation */}
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "UpdateReservation"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("UpdateReservation")}
              >
                <CalendarClock  className="h-5 w-5" />
                Update Reservation
              </Link>

              <Link
                className={
                  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                }
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

      
      </header>
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
          case "ManageMenu":
            return <ManageMenu />;
          case "ManageOrder":
            return <ManageOrder />;
          case "Reservation":
            return <Reservation />;
          case "Review":
            return <Review />;
          case "UpdateMenuItem":
            return <UpdateMenuItem/>
          case "UpdateOrder":
            return <UpdateOrder/>
          case "UpdateReservation":
            return <UpdateReservation/>

          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
};

export default HomePage;
