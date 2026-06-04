"use client";

import { Search, House, Utensils, BookOpen, Compass, Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="fab fab-flower">
      <div
        tabIndex={0}
        role="Link"
        className="btn btn-lg btn-circle btn-success"
      >
        <Compass size={24} />
      </div>

      {/* Main Action */}
      <button className="fab-main-action btn btn-circle btn-lg">
        <Compass size={24} />
      </button>

      {/* FAB Links */}
      <Link href={"/"} className="btn btn-lg btn-circle">
        <House size={22} />
      </Link>

      <Link href={"/search"} className="btn btn-lg btn-circle">
        <Search size={22} />
      </Link>

      <Link href={"/myIngredients"} className="btn btn-lg btn-circle">
        <Utensils size={22} />
      </Link>

      <Link href="/add-recipe" className="btn btn-lg btn-circle btn-primary">
        <Plus size={22} />
      </Link>
    </div>
  );
}
