namespace Application.UseCases.Links.AddLink;

public record AddLinkCommand(
    string Name,
    string Url
);
