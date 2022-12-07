import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./error-message";
import type { Actor, Movie } from "@prisma/client";
import { RouteInputs, trpc } from "../utils/trpc";

export type MoviePayload = RouteInputs["movie"]["create"];



type Props = {
  onSubmit: (data: MoviePayload) => void;
  isLoading: boolean;
  errors?: { [key: string]: string[] | undefined };
  data?: Movie;
  actors?:Actor[];
};


const MovieForm = function ({ onSubmit, errors, isLoading, data,actors }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: data
  });
  const [checkedActors, setCheckedActors] = useState<Actor[]>([]);
  const getGenres = () => trpc.genre.getAll.useQuery().data;
  const getActors=()=>trpc.actor.getAll.useQuery().data;

  const handleOnChange = (actor:Actor,value:boolean) => {
    if(value)
    {
      actors=actors?.concat(actor);
    }
    else
    {
      actors=actors?.filter(item => item.id !== actor.id);
    }
  }; 
  const checkItem=(actor:Actor)=>
  {
    if(actors !== undefined)
    {
      if(actors?.some(r=> r.id===actor.id))
      {
        return true;
      }
    }
    return false;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-2"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className="input-bordered input"
          {...register("title")}
        />
        <ErrorMessage errors={errors?.title} />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Year</span>
        </label>
        <input
          type="number"
          step={0}
          className="input-bordered input"
          {...register("year", { valueAsNumber: true })}
        />
        <ErrorMessage errors={errors?.year} />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Rating</span>
        </label>
        <input
          type="number"
          step={0.1}
          className="input-bordered input"
          {...register("rating", { valueAsNumber: true })}
        />
        <ErrorMessage errors={errors?.rating} />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Link</span>
        </label>
        <input
          type="url"
          step={0}
          className="input-bordered input"
          {...register("link")}
        />
        <ErrorMessage errors={errors?.link} />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Genre</span>
        </label>
        <select className="select-bordered select" {...register("genreId")}>
          <option value="">-</option>
          {getGenres()?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <ErrorMessage errors={errors?.genreId} />
      </div>
      
      <div className="form-control">
        <label className="label">
            <span className="label-text">Actors</span>
            <div className="flex flex-wrap gap-3">
            {getActors()?.map((g) => (
              <>
              <span className="label-text">{g.name} </span> 
              <input type="checkbox" className="checkbox checkbox-primary" value={g.name} key={g.id} onChange={(e)=>handleOnChange(g,e.target.checked )} 
              defaultChecked={checkItem(g)}/>
              </>
          ))}
            
            </div>
        </label>
      </div>
      <button className="btn-primary btn" type="submit" disabled={isLoading}>
        Save
      </button>
    </form>
  );
};

export default MovieForm;
