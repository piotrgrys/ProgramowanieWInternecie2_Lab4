import { useRouter } from "next/router";
import React from "react";
import MovieForm, { type MoviePayload } from "../../components/movie-form";
import { trpc } from "../../utils/trpc";

const Edit = () => {
  const router = useRouter();
  const id = (router.query.id as string) ?? "";
  const { data } = trpc.movie.byId.useQuery(id);
  const {
    isLoading: isMutating,
    mutate,
    error,
  } = trpc.movie.edit.useMutation({
    onSuccess() {
      router.push("/");
    },
  });

  const onSubmit = (data1: MoviePayload) => {
    mutate({
      ...data1,
      id,
    });
  };

  const errors = error?.data?.zodError?.fieldErrors;

  if (!data) return <div>Loading...</div>;

  return (
    <MovieForm
      errors={errors}
      isLoading={isMutating}
      onSubmit={onSubmit}
      data={data}
      actors={data.actors}
    />
  );
};

export default Edit;
