"use client";

import React from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DeleteArticle from "./delete-article";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
  FieldDescription,
  FieldSet,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ResetArticleThumbnail from "./delete-article-thumbnail";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";

import ArticleImagesDashboard from "./article-images-dashboard";
import { Spinner } from "@/components/ui/spinner";
import {
  useUploadArticleImages,
  CreateArticleImagesInput,
  createArticleImagesInputSchema,
} from "../../api/create-article-images";
import {
  useUpdateArticleThumbnail,
  UpdateArticleThumbnailInput,
  updateArticleThumbnailInputSchema,
} from "../../api/update-article-thumbnail";
import { useArticle } from "../../api/get-article";
import {
  useUpdateArticle,
  UpdateArticleInput,
  updateArticleInputSchema,
} from "../../api/update-article";
import { Article } from "../../types/api";

type UpdateArticleProps = {
  articleId: string;
};

const ArticleContentImagesForm = ({ article }: { article: Article }) => {
  const articleImages = article?.contentImages;
  const uploadArticleImagesMutation = useUploadArticleImages({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Images upload successfully");
      },
    },
  });

  const form = useForm<CreateArticleImagesInput>({
    resolver: zodResolver(createArticleImagesInputSchema),
    defaultValues: {
      files: [],
    },
  });

  const onSubmit = (values: CreateArticleImagesInput) => {
    uploadArticleImagesMutation.mutate({
      data: values,
      articleId: article.id,
    });
  };

  return (
    <div>
      <FieldGroup>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend>Upload Images</FieldLegend>
            <FieldDescription>
              List of images related to article
            </FieldDescription>

            <Controller
              control={form.control}
              name="files"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Files Input</FieldLabel>
                  <Input
                    id={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="file"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) =>
                      field.onChange(Array.from(e.target.files || []))
                    }
                    multiple
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button
                type="submit"
                disabled={uploadArticleImagesMutation.isPending}
              >
                {uploadArticleImagesMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Uploading...
                  </span>
                ) : (
                  "Upload"
                )}
              </Button>
            </Field>
          </FieldSet>
        </form>
        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Images Manager</FieldLegend>
          <FieldContent>
            <ArticleImagesDashboard
              images={articleImages}
              articleId={article.id}
            />
          </FieldContent>
        </FieldSet>
      </FieldGroup>
    </div>
  );
};

const UploadArticleThumbnailForm = ({ article }: { article: Article }) => {
  const articleId = article.id;
  const updateArticleThumbnailMutation = useUpdateArticleThumbnail({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Thumbnail uploaded");
      },
    },
  });

  const form = useForm<UpdateArticleThumbnailInput>({
    resolver: zodResolver(updateArticleThumbnailInputSchema),
  });

  const onSubmit = (values: UpdateArticleThumbnailInput) => {
    const { file } = values;

    if (file instanceof File || file == null) {
      updateArticleThumbnailMutation.mutate({
        articleId,
        file: file,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <Controller
              control={form.control}
              name="file"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    {article.thumbnail?.url ? (
                      <div className="relative aspect-4/3 w-[328px]">
                        <Image
                          src={article.thumbnail.url}
                          alt={field.name}
                          fill={true}
                          sizes="328px"
                          priority
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="aspect-4/3 w-[328px] flex items-center justify-center">
                        <p className=" text-sm">No Image</p>
                      </div>
                    )}
                  </FieldContent>
                  <FieldLabel htmlFor={field.name}>Thumbnail</FieldLabel>
                  <FieldDescription>
                    Select or Upload a thumbnail image for your article
                  </FieldDescription>
                  <Input
                    id={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    type="file"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button type="submit">Upload</Button>
              <ResetArticleThumbnail
                id={articleId}
                disabled={article.thumbnail ? false : true}
              />
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

const UpdateArticleInfoForm = ({ article }: { article: Article }) => {
  const articleId = article.id;

  const updateArticleMutation = useUpdateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Article Information is updated.");
      },
    },
  });

  const form = useForm<UpdateArticleInput>({
    resolver: zodResolver(updateArticleInputSchema),
    defaultValues: {
      title: article?.title,
      category: article?.category ?? "",
      link: article?.link ?? "",
    },
  });

  const onSubmit = (values: UpdateArticleInput) => {
    updateArticleMutation.mutate({ data: values, articleId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Information</FieldLegend>
            <FieldDescription>Basic article info</FieldDescription>

            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={255}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={40}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="link"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Link</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    maxLength={40}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Save</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const UpdateArticleContentForm = ({ article }: { article: Article }) => {
  const articleId = article.id;

  const updateArticleMutation = useUpdateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Article Content is updated.");
      },
    },
  });

  const form = useForm<UpdateArticleInput>({
    resolver: zodResolver(updateArticleInputSchema),
    defaultValues: {
      title: article.title,
      content: article?.content ?? "",
    },
  });

  const onSubmit = (values: UpdateArticleInput) => {
    updateArticleMutation.mutate({ data: values, articleId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Content Editor</FieldLegend>
            <FieldDescription>
              Compose the article and upload media.
            </FieldDescription>

            <Controller
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Save</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

const ArticleControlForm = ({ article }: { article: Article }) => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const router = useRouter();
  const articleId = article.id;

  const updateArticleMutation = useUpdateArticle({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Article is updated.");
      },
    },
  });

  const form = useForm<UpdateArticleInput>({
    resolver: zodResolver(updateArticleInputSchema),
    defaultValues: {
      title: article.title,
      published: article?.published,
    },
  });

  const onSubmit = (values: UpdateArticleInput) => {
    updateArticleMutation.mutate({ data: values, articleId });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Publish Settings</FieldLegend>
            <FieldDescription>
              Manage the settings for this article, such as type, date, and
              visibility.
            </FieldDescription>
            <Controller
              control={form.control}
              name="published"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor={field.name}>Publish</FieldLabel>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Save</Button>
          </Field>

          <FieldSeparator />

          <FieldSet>
            <FieldLegend>Article Control</FieldLegend>
            <FieldDescription>
              Delete or Unpublish your article.
            </FieldDescription>

            <Field orientation="horizontal">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Delete Article</span>
                <span className="text-xs text-muted-foreground">
                  This action cannot be undone.
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
      <DeleteArticle
        id={articleId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={() => router.push(paths.dashboard.articles.getHref())}
      />
    </div>
  );
};

const UpdateArticle = ({ articleId }: UpdateArticleProps) => {
  const router = useRouter();
  const articleQuery = useArticle(articleId);
  const article = articleQuery?.data;

  if (!article) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => router.push(paths.dashboard.articles.getHref())}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        <div className="flex flex-col">
          <p className="text-2xl font-medium">Edit Article</p>
          <p className="text-muted-foreground text-sm">
            Update article content, images, and settings.
          </p>
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="py-6 space-y-8">
          <UpdateArticleInfoForm article={article} />
          <Separator />
          <UploadArticleThumbnailForm article={article} />
        </TabsContent>
        <TabsContent value="content" className="py-6 space-y-8">
          <UpdateArticleContentForm article={article} />
          <Separator />
          <ArticleContentImagesForm article={article} />
        </TabsContent>
        <TabsContent value="control" className="py-6">
          <ArticleControlForm article={article} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateArticle;
